from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def loginPage(req):

    print(req.method)
    if not req.GET:
        return render(req,"login.html")
    else:
        return HttpResponse("OK", status=200)



def signup(req):
    return render(req,"signup.html")

def dashboard(req):
    return render(req,"dashboard.html")
