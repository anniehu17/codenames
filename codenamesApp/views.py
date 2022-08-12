import json
import random
import uuid

from django.forms import model_to_dict
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.shortcuts import render, get_object_or_404

# Create your views here.
from django.views.decorators.csrf import csrf_exempt

from .forms import SignInForm

words = ["Bird", "Box", "Crane", "Water", "Glasses", "Pen", "Controller", "Tablet", "Carpet", "Chair", "Wood", "Tentacle", "Plane", "AbstractAbstract"]
layouts = [["Red", 5], ["Blue", 3], ["Black", 1]]


def test(request):
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


'''def index(request):
    book_list = Book.objects.order_by('title').filter(owner__first_name="NONE").distinct()
    acc = request.session.get("account")
    acc = json.loads(acc)
    if acc:
        account = Account.objects.get(pk=acc["id"])
    else: account = None

    context = {'book_list': book_list, 'form': SignInForm(), 'account': account}
    return render(request, 'library/index.html', context)

def checkout(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    return render(request, 'library/checkout.html', {'book': book})

def account(request):
    pass

@csrf_exempt
def logout(request):
    request.session["account"] = "{}"
    return HttpResponseRedirect("/")

@csrf_exempt
def login(request):
    first_name = get_value(request.body, "first_name")
    last_name = get_value(request.body, "last_name")

    account = Account.objects.filter(first_name=first_name).filter(last_name=last_name).first()
    if not account:
        account = Account(first_name=first_name, last_name=last_name, uid=uuid.uuid4())
    model_dict = model_to_dict(account)
    model_dict["uid"] = str(model_dict["uid"])
    request.session["account"] = json.dumps(model_dict)

    return HttpResponseRedirect("/")

@csrf_exempt
def checkout_success(request, book_id):
    book = get_object_or_404(Book, pk=book_id)
    first_name = get_value(request.body, "first_name")
    last_name = get_value(request.body, "last_name")
    account = Account(first_name=first_name, last_name=last_name, uid=uuid.uuid4())
    account.save()
    book.checkout(account)
    return HttpResponse(f"{first_name} {last_name} checked out: {book.title}.")

def get_value(body, field):
    text = body.decode('utf-8')
    fields = text.split("&")
    entries = [v.replace(f"{field}=", "") for v in fields if v.find(field) != -1]
    return entries[0] if entries else None'''