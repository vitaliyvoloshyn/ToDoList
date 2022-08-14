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