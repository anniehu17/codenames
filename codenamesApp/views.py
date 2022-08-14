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
    request_json = json.loads(request.body.decode('utf-8'))

    current_account = request.session.get("current_account")

    if not current_account:
        return HttpResponse(status=404)

    if current_account != username:
        return HttpResponse(status=502)

    entry = Leaderboard.objects.filter(username=username).first()

    if not entry:
        entry = Leaderboard(username=username, points=int(request_json["points"]))
    else:
        entry.points += int(request_json["points"])

    entry.save()

    return HttpResponse(status=200)


def test(request: HttpRequest):
    return JsonResponse(generate_board_and_clues())


def clues(request):
    cluelist = []

    return JsonResponse(cluelist, safe=False)
    # list of top 100 clues (aka list of strings)

