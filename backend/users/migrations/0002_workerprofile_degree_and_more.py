# Generated by Django 4.2.5 on 2023-10-04 17:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='workerprofile',
            name='degree',
            field=models.CharField(default='Бакалавриат', max_length=150, verbose_name='Научная степень'),
        ),
        migrations.AddField(
            model_name='workerprofile',
            name='diploma_finish_year',
            field=models.IntegerField(default=2023, verbose_name='Окончание учебы'),
        ),
        migrations.AddField(
            model_name='workerprofile',
            name='diploma_start_year',
            field=models.IntegerField(default=2023, verbose_name='Начало учебы'),
        ),
        migrations.AddField(
            model_name='workerprofile',
            name='faculty',
            field=models.CharField(default=None, max_length=150, verbose_name='Факультет'),
        ),
        migrations.AddField(
            model_name='workerprofile',
            name='first_name',
            field=models.CharField(default=None, max_length=150),
        ),
        migrations.AddField(
            model_name='workerprofile',
            name='last_name',
            field=models.CharField(default=None, max_length=150),
        ),
        migrations.AlterField(
            model_name='workerprofile',
            name='diploma',
            field=models.ImageField(default=None, null=True, upload_to='diplomas/', verbose_name='Дипломы, сертификаты, грамоты'),
        ),
        migrations.AlterField(
            model_name='workerprofile',
            name='education',
            field=models.CharField(default=None, max_length=150, verbose_name='Факультет'),
        ),
        migrations.AlterField(
            model_name='workerprofile',
            name='job_example',
            field=models.ImageField(default=None, null=True, upload_to='examples/', verbose_name='Примеры работ/портфолио'),
        ),
    ]
