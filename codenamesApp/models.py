from django.db import models

class Leaderboard(models.Model):
    username = models.CharField(max_length=200)
    points = models.PositiveIntegerField()

class Account(models.Model):
    username = models.CharField(max_length=200)
    password = models.CharField(max_length=200)