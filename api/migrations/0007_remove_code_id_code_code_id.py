# Generated by Django 5.1 on 2024-08-13 10:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_alter_code_code'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='code',
            name='id',
        ),
        migrations.AddField(
            model_name='code',
            name='code_id',
            field=models.CharField(default=1, editable=False, max_length=32, primary_key=True, serialize=False),
            preserve_default=False,
        ),
    ]
