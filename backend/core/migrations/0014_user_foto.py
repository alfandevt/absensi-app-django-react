# Generated by Django 3.2.16 on 2022-11-18 00:30

import core.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_auto_20221118_0029'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='foto',
            field=models.ImageField(null=True, upload_to=core.models.user_foto_file_path),
        ),
    ]
