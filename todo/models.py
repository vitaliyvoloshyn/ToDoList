from django.db import models

from users.models import CustomUser


class ProjectModel(models.Model):
    name = models.CharField(max_length=255, verbose_name='Имя')
    url = models.URLField()
    user = models.ManyToManyField(CustomUser)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = 'Проект'
        verbose_name_plural = 'Проекты'


class TodoModel(models.Model):
    note_state = [('Открыта', 'Открыта'), ('Закрыта', 'Закрыта')]

    project = models.ForeignKey(ProjectModel, on_delete=models.CASCADE)
    description = models.TextField(verbose_name='Текст заметки')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата последнего обновления')
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE, verbose_name='Автор заметки')
    close = models.CharField(default='Открыта', max_length=7, choices=note_state, verbose_name='Состояние заметки')

    class Meta:
        verbose_name = 'Заметка'
        verbose_name_plural = 'Заметки'
