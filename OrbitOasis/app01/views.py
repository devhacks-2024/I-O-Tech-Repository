from django.shortcuts import render

# Create your views here.
def loginPage(req):
    return render(req,"login.html")

def signup(req):
    return render(req,"signup.html")
