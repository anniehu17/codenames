import json
import random
import uuid

from django.forms import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpRequest
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

words = ["Bird", "Box", "Crane", "Water", "Glasses", "Pen", "Controller", "Tablet", "Carpet", "Chair", "Wood", "Tentacle", "Plane", "AbstractAbstract"]
layouts = [["Red", 5], ["Blue", 3], ["Black", 1]]


def test(request: HttpRequest):
    random_words = []
    wc = list(words)
    wc = [word.upper() for word in wc]
    board = []
    for layout in layouts:
        for _ in range(layout[1]):
            random_words.append({"color": layout[0], "word": wc.pop(random.randint(0, len(wc)-1))})
    for _ in range(3):
        row = []
        for __ in range(3):
            row.append(random_words.pop(random.randint(0, len(random_words)-1)))
        board.append(row)
    return JsonResponse({"board": board})

# request has header params

# fetch info from database (when they try to view leaderboard)
# store info in database (everytime they finish a game)
# login in database - check if the acc exists to create new (when they try to login = signup)