import json
import random
import uuid

from django.forms import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse, HttpRequest
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from algorithm import generate_board_and_clues
from codenamesApp.models import Account, Leaderboard


@require_POST
@csrf_exempt
def login(request: HttpRequest):
    username = request.headers.get("username")
    password = request.headers.get("password")

    account = Account.objects.filter(username=username).first()
    if not account:
        account = Account(username=username, password=password)
        account.save()

    if account.password != password:
        return HttpResponse(status=404)

    request.session["current_account"] = account.username

    return HttpResponse(status=200)


def leaderboard(request):
    username = request.headers.get("username")
    points = request.headers.get("points")

    current_account = request.session.get("current_account")

    if not current_account:
        return HttpResponse(status=404)

    if current_account != username:
        return HttpResponse(status=502)

    entry = Leaderboard.objects.filter(username=username).first()

    if not entry:
        entry = Leaderboard(username=username, points=points)
    else:
        entry.points += points

    entry.save()

    return HttpResponse(status=200)


def test(request: HttpRequest):
    leaders = [{"username": entry.username, "points": entry.points} for entry in list(Leaderboard.objects.order_by("-points").all())]
    board_and_clues = generate_board_and_clues()
    board_and_clues["leaderboard"] = leaders
    return JsonResponse(board_and_clues)


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
