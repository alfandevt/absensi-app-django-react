# Generated by Django 3.2.16 on 2022-11-17 03:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_rename_detilakun_profil'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profil',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='profil', to=settings.AUTH_USER_MODEL),
        ),
    ]
