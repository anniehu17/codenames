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

import profanity_check

@require_POST
@csrf_exempt
def login(request: HttpRequest):
    username = request.headers.get("username")
    password = request.headers.get("password")

    if profanity_check.predict([username]) == 1:
        return HttpResponse(status=500)

    account = Account.objects.filter(username=username).first()
    if not account:
        account = Account(username=username, password=password)
        account.save()

    if account.password != password:
        return HttpResponse(status=404)

    request.session["current_account"] = account.username

    return HttpResponse(status=200)

def get_points(request):
    username = request.headers.get("username")

    current_account = request.session.get("current_account")
    if not current_account:
        return HttpResponse(status=404)

    if current_account != username:
        return HttpResponse(status=502)

    entry = Leaderboard.objects.filter(username=username).first()

    return JsonResponse({"points": entry.points})

@require_POST
@csrf_exempt
def add_points(request):
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
        entry.save()
        return HttpResponse(status=200)

    entry.points += int(points)
    entry.save()
    return HttpResponse(status=200)


def game(request: HttpRequest):
    leaders = [{"username": entry.username, "points": entry.points} for entry in list(Leaderboard.objects.order_by("-points").all())]
    board_and_clues = generate_board_and_clues()
    board_and_clues["leaderboard"] = leaders
    request.session["clues"] = board_and_clues.pop("clues")

    return JsonResponse(board_and_clues)


def clues(request):
    return JsonResponse(request.session["clues"], safe=False)
    # list of top 100 clues (aka list of strings)

