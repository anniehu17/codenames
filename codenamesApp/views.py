import json
import random
import uuid

from django.forms import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpRequest
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from algorithm import generate_board_and_clues

words = ["Bird", "Box", "Crane", "Water", "Glasses", "Pen", "Controller", "Tablet", "Carpet", "Chair", "Wood", "Tentacle", "Plane", "AbstractAbstract"]
layouts = [["Red", 5], ["Blue", 3], ["Black", 1]]


def test(request: HttpRequest):
    return JsonResponse(generate_board_and_clues())

def clues(request):
    cluelist = []

    return JsonResponse(cluelist, safe=False)
    # list of top 100 clues (aka list of strings)

# request has header params

# fetch info from database (when they try to view leaderboard)
# store info in database (everytime they finish a game)
# login in database - check if the acc exists to create new (when they try to login = signup)

'''
to do:
add refresh so we can play again without refreshing page and to avoid how to play popup
put leaderboard on right
add button to sign in to save score

'''
