import json

from django.forms import model_to_dict
from django.http import HttpResponse
from django.shortcuts import render

import codenames_core
from codenamesApp.models import Account, Leaderboard
from codenames_core import *

# Create your views here.



def index(request):

    '''
    TODO
        Make 3x3 board of 9 words
        Call codenamesApp ML function on those 9 words to get 100 clues
        Check if user given clue is in 100 clues and give name
        Output 5 best clues
    '''

    board = codenames_core.make_board()




    return HttpResponse(json.dumps(board))

def login(request):
    '''
    request has fields
    field 1 - "username"
    field 2 - "password"
    '''

    request_json = json.loads(request.body.decode('utf-8'))

    account = Account.objects.filter(username=request_json["username"]).first()
    if not account:
        account = Account(username=request_json["username"], password=request_json["password"])
        account.save()

    if account.password != request_json["password"]:
        return HttpResponse(status=404)

    request.session["current_account"] = account.username

    return HttpResponse(status=200)

def leaderboard(request):
    '''

    field 1 - username
    field 2 - points
    '''

    request_json = json.loads(request.body.decode('utf-8'))

    current_account = request.session.get("current_account")

    if not current_account:
        return HttpResponse(status=404)

    if current_account != request_json["username"]:
        return HttpResponse(status=502)

    entry = Leaderboard.objects.filter(username=request_json["username"]).first()

    if not entry:
        entry = Leaderboard(username=request_json["username"], points=int(request_json["points"]))
    else:
        entry.points += int(request_json["points"])

    entry.save()

    return HttpResponse(status=200)
