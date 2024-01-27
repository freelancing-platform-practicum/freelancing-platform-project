# Generated by Django 4.2.5 on 2023-12-11 03:28

import django.core.validators
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='Member',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('email', models.EmailField(db_index=True, max_length=254, unique=True, verbose_name='email address')),
                ('first_name', models.CharField(max_length=150)),
                ('last_name', models.CharField(max_length=150)),
                ('is_customer', models.BooleanField(default=False)),
                ('is_worker', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('design', 'дизайн'), ('development', 'разработка'), ('testing', 'тестирование'), ('administration', 'администрирование'), ('marketing', 'маркетинг'), ('content', 'контент'), ('other', 'разное')], max_length=50, verbose_name='Название специализации')),
                ('slug', models.SlugField(blank=True, verbose_name='Идентификатор специализации')),
            ],
            options={
                'verbose_name': 'Специализация',
                'verbose_name_plural': 'Специализации',
                'ordering': ('-name',),
            },
        ),
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(choices=[('phone', 'Phone number'), ('email', 'E-mail'), ('telegram', 'Telegram'), ('other', 'Other')], max_length=150)),
                ('value', models.CharField(max_length=150, verbose_name='Контакт')),
                ('preferred', models.BooleanField(default=False, verbose_name='Предпочитаемый вид контакта')),
            ],
        ),
        migrations.CreateModel(
            name='DiplomaFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.ImageField(upload_to='education/')),
                ('name', models.CharField(max_length=255, verbose_name='Имя документа')),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='education/thumbnails/')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default=None, max_length=150, verbose_name='Учебное заведение')),
                ('faculty', models.CharField(default=None, max_length=150, verbose_name='Факультет')),
                ('start_year', models.IntegerField(default=2023, verbose_name='Начало учебы')),
                ('finish_year', models.IntegerField(default=2023, verbose_name='Окончание учебы')),
                ('degree', models.CharField(default='Бакалавриат', max_length=150, verbose_name='Научная степень')),
            ],
            options={
                'verbose_name': 'Образование',
                'ordering': ('-name',),
            },
        ),
        migrations.CreateModel(
            name='FreelancerCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_category', to='users.category')),
            ],
        ),
        migrations.CreateModel(
            name='FreelancerContact',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('contact', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_contact', to='users.contact')),
            ],
        ),
        migrations.CreateModel(
            name='FreelancerEducation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('education', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.education')),
            ],
        ),
        migrations.CreateModel(
            name='FreelancerPortfolio',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='FreelancerStack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
            ],
        ),
        migrations.CreateModel(
            name='Industry',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255, verbose_name='Сфера деятельности')),
            ],
        ),
        migrations.CreateModel(
            name='PortfolioFile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('file', models.ImageField(upload_to='portfolio/')),
                ('name', models.CharField(max_length=255, verbose_name='Имя документа')),
                ('thumbnail', models.ImageField(blank=True, null=True, upload_to='portfolio/thumnails/')),
            ],
        ),
        migrations.CreateModel(
            name='Stack',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, verbose_name='Необходимый навык')),
                ('slug', models.SlugField(blank=True, validators=[django.core.validators.RegexValidator(message='Используйте допустимые символы!', regex='^[-a-zA-Z0-9_]+$')])),
            ],
            options={
                'ordering': ['name'],
            },
        ),
        migrations.CreateModel(
            name='WorkerProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, default=None, null=True, upload_to='bio/images/', verbose_name='Фото')),
                ('payrate', models.IntegerField(default=0, validators=[django.core.validators.MinValueValidator(0)], verbose_name='Ставка оплаты')),
                ('about', models.TextField(blank=True, max_length=500, verbose_name='О себе')),
                ('web', models.URLField(blank=True, verbose_name='Личный сайт')),
                ('categories', models.ManyToManyField(through='users.FreelancerCategory', to='users.category')),
                ('contacts', models.ManyToManyField(through='users.FreelancerContact', to='users.contact')),
                ('education', models.ManyToManyField(blank=True, through='users.FreelancerEducation', to='users.education')),
                ('portfolio', models.ManyToManyField(blank=True, through='users.FreelancerPortfolio', to='users.portfoliofile')),
                ('stacks', models.ManyToManyField(blank=True, through='users.FreelancerStack', to='users.stack')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddField(
            model_name='freelancerstack',
            name='freelancer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_stack', to='users.workerprofile'),
        ),
        migrations.AddField(
            model_name='freelancerstack',
            name='stack',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_stack', to='users.stack'),
        ),
        migrations.AddField(
            model_name='freelancerportfolio',
            name='freelancer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_portfolio', to='users.workerprofile'),
        ),
        migrations.AddField(
            model_name='freelancerportfolio',
            name='portfolio',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_portfolio', to='users.portfoliofile'),
        ),
        migrations.AddField(
            model_name='freelancereducation',
            name='freelancer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.workerprofile'),
        ),
        migrations.AddField(
            model_name='freelancercontact',
            name='freelancer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_contact', to='users.workerprofile'),
        ),
        migrations.AddField(
            model_name='freelancercategory',
            name='freelancer',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_category', to='users.workerprofile'),
        ),
        migrations.CreateModel(
            name='EducationDiploma',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('diploma', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_diploma', to='users.diplomafile')),
                ('education', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='f_diploma', to='users.education')),
            ],
        ),
        migrations.AddField(
            model_name='education',
            name='diploma',
            field=models.ManyToManyField(through='users.EducationDiploma', to='users.diplomafile'),
        ),
        migrations.CreateModel(
            name='CustomerProfile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('photo', models.ImageField(blank=True, default=None, null=True, upload_to='about/images/', verbose_name='Фото или логотип')),
                ('email', models.EmailField(blank=True, db_index=True, max_length=254, null=True, unique=True, verbose_name='публичный email для связи')),
                ('name', models.CharField(max_length=150, verbose_name='Название компании или ваше имя')),
                ('about', models.TextField(blank=True, max_length=500, verbose_name='О себе')),
                ('web', models.URLField(blank=True, verbose_name='Личный сайт')),
                ('industry', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.PROTECT, to='users.industry')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]