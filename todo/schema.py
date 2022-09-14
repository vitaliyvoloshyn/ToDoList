import graphene
from graphene_django import DjangoObjectType

from users.models import CustomUser
from .models import TodoModel, ProjectModel


class TodoType(DjangoObjectType):
    class Meta:
        model = TodoModel
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = ProjectModel
        fields = '__all__'


class UserType(DjangoObjectType):
    class Meta:
        model = CustomUser
        fields = '__all__'


class Query(graphene.ObjectType):
    '''получение списка задач'''
    all_todos = graphene.List(TodoType)

    def resolve_all_todos(root, info):
        return TodoModel.objects.all()

    '''получение пользователя по его id'''
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))

    def resolve_user_by_id(self, info, id):
        try:
            return CustomUser.objects.get(id=id)
        except CustomUser.DoesNotExist:
            return None

    '''получение проекта по его имени'''
    project_by_name = graphene.List(ProjectType, name=graphene.String(required=False))

    def resolve_project_by_name(self, info, name=None):
        projects = ProjectModel.objects.all()
        if name:
            projects = projects.filter(name=name)
        return projects

    '''получение задач по имени проекта'''
    todo_by_project_name = graphene.List(TodoType, name=graphene.String(required=False))

    def resolve_todo_by_project_name(self, info, name=None):
        todos = TodoModel.objects.all()
        if name:
            todos = todos.filter(project__name=name)
        return todos


schema = graphene.Schema(query=Query)
