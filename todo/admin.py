from django.contrib import admin
from django.urls import reverse
from django.utils.http import urlencode

from todo.models import ProjectModel


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
