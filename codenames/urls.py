from django.urls import path

from . import views

name = "codenames"
urlpatterns = [
    # ex: /polls/
    path('', views.index, name='index'),
    path('login', views.login, name='login')
]