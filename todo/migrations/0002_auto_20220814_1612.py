# Generated by Django 3.2.15 on 2022-08-14 13:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('todo', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='projectmodel',
            options={'verbose_name': 'Проект', 'verbose_name_plural': 'Проекты'},
        ),
        migrations.AlterField(
            model_name='projectmodel',
            name='name',
            field=models.CharField(max_length=255, verbose_name='Имя'),
        ),
        migrations.CreateModel(
            name='TodoModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(verbose_name='Текст заметки')),
                ('created_at', models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')),
                ('updated_at', models.DateTimeField(auto_now=True, verbose_name='Дата последнего обновления')),
                ('close', models.CharField(choices=[('Открыта', 'Открыта'), ('Закрыта', 'Закрыта')], default='Открыта', max_length=7, verbose_name='Состояние заметки')),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todo.projectmodel')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Автор заметки')),
            ],
            options={
                'verbose_name': 'Заметка',
                'verbose_name_plural': 'Заметки',
            },
        ),
    ]
