import json
import os

from django.core.management import BaseCommand

from todo.models import ProjectModel, TodoModel
from todolist.settings.debug_pg import BASE_DIR
from users.models import CustomUser


class Command(BaseCommand):
    help = 'Добавляет тестовые данные в модели Project и TODO'

    def handle(self, *args, **kwargs):
        # Заполняем таблицу users
        if not CustomUser.objects.all():
            with open(os.path.join(BASE_DIR, "users.json"), "r") as f:
                users = json.load(f)

            for elem in users:
                if elem.get('is_superuser'):
                    CustomUser.objects.create_user(id=elem['id'], username=elem['username'], email=elem['email'],
                                                   password=elem['password'], is_superuser=True, is_staff=True)
                    self.stdout.write(
                        self.style.SUCCESS(f"Создан суперпользователь - {elem['username']}, пароль - {elem['password']}"))
                else:
                    CustomUser.objects.create_user(id=elem['id'], username=elem['username'], email=elem['email'],
                                                   password=elem['username'])
                    self.stdout.write(
                        self.style.SUCCESS(f"Создан пользователь - {elem['username']}, пароль - {elem['password']}"))
        else:
            self.stdout.write(f"В таблице пользователей уже есть данные")

        # Заполняем таблицу Project
        if not ProjectModel.objects.all():
            with open(os.path.join(BASE_DIR, "projects.json"), "r") as f:
                projects = json.load(f)
            for index, elem in enumerate(projects):
                ProjectModel.objects.create(id=elem['id'], name=elem['name'], url=elem['url']).user.set(elem['user'])
            self.stdout.write(self.style.SUCCESS(f"Добавлено {index+1} проектов"))
        else:
            self.stdout.write(f"В таблице проектов уже есть данные")
        # Заполняем таблицу todo

        if not TodoModel.objects.all():
            with open(os.path.join(BASE_DIR, "todos.json"), "r") as f:
                todos = json.load(f)
            for index, elem in enumerate(todos):
                TodoModel.objects.create(id=elem['id'], project=ProjectModel.objects.get(pk=elem['project']),
                                         description=elem['description'], user=CustomUser.objects.get(pk=elem['user']))
            self.stdout.write(self.style.SUCCESS(f"Добавлено {index+1} заметок"))
        else:
            self.stdout.write(f"В таблице заметок уже есть данные")
