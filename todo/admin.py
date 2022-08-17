from django.contrib import admin
from django.urls import reverse
from django.utils.http import urlencode

from todo.models import ProjectModel, TodoModel


@admin.register(ProjectModel)
class ProjectAdmin(admin.ModelAdmin):
    def users_count(self, obj):
        from django.utils.html import format_html
        count = ProjectModel.objects.filter(id=obj.id).values_list('user').count()
        url = (
                reverse("admin:users_customuser_changelist")
                + "?"
                + urlencode({"projectmodel__id": f"{obj.id}"})
        )
        return format_html('<a href="{}">{}</a>', url, count)

    list_display = ['name', 'url', 'users_count']

    users_count.short_description = 'Количество пользователей на проекте'


@admin.register(TodoModel)
class TodoModelAdmin(admin.ModelAdmin):
    list_display = ['description', 'project', 'created_at', 'updated_at', 'user', 'close']
    ordering = ['-close', '-created_at']
