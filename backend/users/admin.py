from django.contrib import admin

from .models import (Member, Stack,
                     Activity, WorkerProfile,
                     Contacts)


@admin.register(Contacts)
class ContactsAdmin(admin.ModelAdmin):
    list_display = ('freelancer', 'type', 'contact',)
    empty_value_display = '-пусто-'