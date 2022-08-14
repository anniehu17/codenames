from django.urls import path

from . import views

urlpatterns = [
    path('game', views.game, name='game'),
    path('clues', views.clues, name='clues'),
    path('login', views.login, name='login'),
    path('points', views.get_points, name='get_points'),
    path('points/add', views.add_points, name='add_points')
]