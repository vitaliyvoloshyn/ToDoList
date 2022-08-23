from rest_framework.serializers import HyperlinkedModelSerializer, ModelSerializer

from .models import ProjectModel, TodoModel


class ProjectModelSerializer(ModelSerializer):
    class Meta:
        model = ProjectModel
        fields = '__all__'


class TodoModelSerializer(ModelSerializer):
    class Meta:
        model = TodoModel
        fields = '__all__'
