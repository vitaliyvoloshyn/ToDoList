from rest_framework.serializers import HyperlinkedModelSerializer

from .models import ProjectModel, TodoModel


class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = ProjectModel
        fields = ['name', 'url', 'user']


class TodoModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = TodoModel
        fields = '__all__'
