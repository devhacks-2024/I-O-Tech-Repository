from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.
def loginPage(req):

    print(req.method)
    if not req.GET:
        return render(req,"login.html")
    else:
        return HttpResponse("OK", status=200)



def signup(req):
    if req.method == "GET":
        return render(req,"signup.html")
    elif req.method == "POST":
        data = json.loads(req.body)
        return JsonResponse(data, status=200)

def dashboard(req):
    return render(req,"dashboard.html")
