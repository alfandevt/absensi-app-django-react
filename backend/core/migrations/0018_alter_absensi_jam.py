# Generated by Django 3.2.16 on 2022-12-01 12:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_alter_absensi_jam'),
    ]

    operations = [
        migrations.AlterField(
            model_name='absensi',
            name='jam',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]