from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator
from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from .models import (Category, Contact, DiplomaFile, Education,
                     EducationDiploma, FreelancerCategory, FreelancerContact,
                     FreelancerEducation, FreelancerPortfolio, FreelancerStack,
                     PortfolioFile, Stack, WorkerProfile)
from .serializers import DynamicFieldsModelSerializer

User = get_user_model()


class UserViewSerialiser(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name')


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'


class StackSerializer(serializers.ModelSerializer):
    """Стэк технологий."""
    class Meta:
        model = Stack
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    """Стэк технологий."""
    class Meta:
        model = Category
        fields = '__all__'


class DiplomaFileSerializer(serializers.ModelSerializer):
    file = Base64ImageField()

    class Meta:
        model = DiplomaFile
        fields = '__all__'


class PortfolioFileSerializer(serializers.ModelSerializer):
    file = Base64ImageField(required=False)

    class Meta:
        model = PortfolioFile
        fields = '__all__'


class EducationSerializer(serializers.ModelSerializer):
    diploma = DiplomaFileSerializer(many=True, required=False)

    class Meta:
        model = Education
        fields = '__all__'


class FreelancerField(serializers.RelatedField):
    def to_representation(self, value):
        return {
            'first_name': value.first_name,
            'last_name': value.last_name
        }

    def to_internal_value(self, data):
        user = self.context.get('request').user
        if not getattr(self.root, 'partial'):
            if 'first_name' not in data:
                raise ValidationError('\'first_name\' обязательное поле')
            if 'last_name' not in data:
                raise ValidationError('\'last_name\' обязательное поле')
        for field, value in data.items():
            setattr(user, field, value)
        user.save()
        return user


class GetWorkerProfileSerializer(DynamicFieldsModelSerializer):
    user = FreelancerField(queryset=User.objects.all())
    is_worker = serializers.ReadOnlyField(source='user.is_worker')
    is_customer = serializers.ReadOnlyField(source='user.is_customer')
    account_email = serializers.ReadOnlyField(source='user.email')
    contacts = ContactSerializer(many=True)
    stacks = StackSerializer(many=True)
    categories = CategorySerializer(many=True)
    education = EducationSerializer(many=True)
    portfolio = PortfolioFileSerializer(many=True, read_only=True)

    class Meta:
        model = WorkerProfile
        fields = '__all__'


class PostWorkerProfileSerializer(DynamicFieldsModelSerializer):
    user = FreelancerField(queryset=User.objects.all())
    is_worker = serializers.ReadOnlyField(source='user.is_worker')
    is_customer = serializers.ReadOnlyField(source='user.is_customer')
    account_email = serializers.ReadOnlyField(source='user.email')
    contacts = ContactSerializer(many=True, required=True)
    stacks = StackSerializer(many=True, required=False)
    categories = CategorySerializer(many=True, required=True)
    education = EducationSerializer(many=True, required=False)
    portfolio = PortfolioFileSerializer(many=True, required=False)

    class Meta:
        model = WorkerProfile
        fields = '__all__'

    def validate_user(self, freelancer):
        user = self.context.get('request').user
        if (
            WorkerProfile.objects.filter(user_id=user.id)
            and self.context.get('request').method == 'POST'
        ):
            raise ValidationError(
                'Профиль уже существует!'
            )
        return user

    def create(self, validated_data):
        if 'contacts' in self.initial_data:
            contacts = validated_data.pop('contacts')
        if 'stacks' in self.initial_data:
            stacks = validated_data.pop('stacks')
        if 'categories' in self.initial_data:
            categories = validated_data.pop('categories')
        if 'education' in self.initial_data:
            education = validated_data.pop('education')
        if 'portfolio' in self.initial_data:
            portfolio = validated_data.pop('portfolio')
        profile = WorkerProfile.objects.create(**validated_data)

        if 'contacts' in locals():
            for contact in contacts:
                record = Contact.objects.create(**contact)
                FreelancerContact.objects.create(
                    freelancer=profile,
                    contact=record
                )

        if 'stacks' in locals():
            for stack in stacks:
                record, status = Stack.objects.get_or_create(**stack)
                FreelancerStack.objects.create(
                    freelancer=profile,
                    stack=record
                )

        if 'categories' in locals():
            for category in categories:
                record, status = Category.objects.get_or_create(**category)
                FreelancerCategory.objects.create(
                    freelancer=profile,
                    category=record
                )

        if 'education' in locals():
            for stage in education:
                if 'diploma' in stage:
                    diploma = stage.pop('diploma')
                record = Education.objects.create(**stage)

                if 'diploma' in locals():
                    for example in diploma:
                        file = DiplomaFile.objects.create(**example)
                        file.create_thumbnail()
                        EducationDiploma.objects.create(
                            education=record,
                            diploma=file
                        )
                FreelancerEducation.objects.create(
                    freelancer=profile,
                    education=record
                )

        if 'portfolio' in locals():
            for example in portfolio:
                file = PortfolioFile.objects.create(**example)
                file.create_thumbnail()
                FreelancerPortfolio.objects.create(
                    freelancer=profile,
                    portfolio=file
                )
        return profile

    def update(self, user, validated_data):
        profile = WorkerProfile.objects.get(user=user)

        if 'contacts' in self.initial_data:
            contacts = validated_data.pop('contacts')
            Contact.objects.filter(workerprofile__user=user).delete()
            for contact in contacts:
                record = Contact.objects.create(**contact)
                FreelancerContact.objects.create(
                    freelancer=profile,
                    contact=record
                )

        if 'stacks' in self.initial_data:
            stacks = validated_data.pop('stacks')
            Stack.objects.filter(workerprofile__user=user).delete()
            for stack in stacks:
                record, status = Stack.objects.get_or_create(**stack)
                profile.stacks.add(record)

        if 'categories' in self.initial_data:
            categories = validated_data.pop('categories')
            Category.objects.filter(workerprofile__user=user).delete()
            for category in categories:
                record, status = Category.objects.get_or_create(**category)
                profile.categories.add(record)

        if 'education' in self.initial_data:
            education = validated_data.pop('education')
            DiplomaFile.objects.filter(
                education__workerprofile__user=user
            ).delete()
            Education.objects.filter(workerprofile__user=user).delete()

            for stage in education:
                if 'diploma' in stage:
                    diploma = stage.pop('diploma')
                record = Education.objects.create(**stage)

                if 'diploma' in locals():
                    for example in diploma:
                        file = DiplomaFile.objects.create(**example)
                        file.create_thumbnail()
                        EducationDiploma.objects.create(
                            education=record,
                            diploma=file
                        )
                FreelancerEducation.objects.create(
                    freelancer=profile,
                    education=record
                )

        if 'portfolio' in self.initial_data:
            portfolio = validated_data.pop('portfolio')
            PortfolioFile.objects.filter(workerprofile__user=user).delete()
            for example in portfolio:
                file = PortfolioFile.objects.create(**example)
                file.create_thumbnail()
                FreelancerPortfolio.objects.create(
                    freelancer=profile,
                    portfolio=file
                )
        for field, value in validated_data.items():
            setattr(profile, field, value)
        profile.save()
        return profile
