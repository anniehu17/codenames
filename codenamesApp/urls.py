from django.urls import path

from . import views

urlpatterns = [
    path('test', views.test, name='test'),
    path('clues', views.clues, name='clues')
]