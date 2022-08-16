import json
import os

from django.core.management import BaseCommand

from todo.models import ProjectModel, TodoModel
from todolist.settings import BASE_DIR
from users.models import CustomUser


class Command(BaseCommand):
    help = 'Добавляет тестовые данные в модели Project и TODO'

    def handle(self, *args, **kwargs):
        # Заполняем таблицу users
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

        # Заполняем таблицу Project
        with open(os.path.join(BASE_DIR, "projects.json"), "r") as f:
            projects = json.load(f)
        for elem in projects:
            ProjectModel.objects.create(id=elem['id'], name=elem['name'], url=elem['url']).user.set(elem['user'])
        self.stdout.write(self.style.SUCCESS(f"Проекты добавлены"))

        # Заполняем таблицу todo
        with open(os.path.join(BASE_DIR, "todos.json"), "r") as f:
            todos = json.load(f)
        for elem in todos:
            TodoModel.objects.create(id=elem['id'], project=ProjectModel.objects.get(pk=elem['project']),
                                     description=elem['description'], user=CustomUser.objects.get(pk=elem['user']))
        self.stdout.write(self.style.SUCCESS(f"Заметки добавлены"))
