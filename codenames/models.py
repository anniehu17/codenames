from django.db import models
from django import forms

class Leaderboard(models.Model):
    username = models.CharField(max_length=200)
    points = models.PositiveIntegerField()

class Account(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)