import json
import os

from django.core.management import BaseCommand

from todolist.settings import BASE_DIR
from users.models import CustomUser


class Command(BaseCommand):
    help = 'Добавляет пользователей'

    def handle(self, *args, **kwargs):
        with open(os.path.join(BASE_DIR, "users.json"), "r") as f:
            users = json.load(f)

        for elem in users:
            if elem.get('is_superuser'):
                CustomUser.objects.create_user(username=elem['username'], email=elem['email'],
                                               password=elem['password'], is_superuser=True, is_staff=True)
                self.stdout.write(
                    self.style.SUCCESS(f"Создан суперпользователь - {elem['username']}, пароль - {elem['password']}"))
            else:
                CustomUser.objects.create_user(username=elem['username'], email=elem['email'],
                                               password=elem['username'])
                self.stdout.write(
                    self.style.SUCCESS(f"Создан пользователь - {elem['username']}, пароль - {elem['password']}"))
