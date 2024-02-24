from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User  # 假设你的用户模型名为 User
import json
from django.contrib.auth.decorators import login_required

# Create your views here.
@csrf_exempt
def loginPage(req):
    if req.method == "GET":
        return render(req, "login.html")
    elif req.method == "POST":
        try:
            data = json.loads(req.body.decode('utf-8'))  # 确保正确解码请求体
            username = data.get('username')
            password = data.get('password')

            user = User.objects.filter(username=username, password=password).first()
            if user:
                # 登录成功逻辑
                return JsonResponse({'status': 0, 'msg': '登录成功'}, status=200)
            else:
                # 用户名或密码不正确
                return JsonResponse({'status': 1, 'msg': '用户名或密码错误'}, status=401)
        except Exception as e:
            return JsonResponse({'status': 1, 'msg': str(e)}, status=500)

@csrf_exempt
def signup(req):
    if req.method == "GET":
        return render(req, "signup.html")
    elif req.method == "POST":
        try:
            data = json.loads(req.body)
            username = data['username']
            password = data['password']

            # 检查用户名是否已存在
            if User.objects.filter(username=username).exists():
                return JsonResponse({'status': 1, 'msg': '用户名已存在'}, status=400)

            # 创建新用户
            User.objects.create(username=username, password=password)
            return JsonResponse({'status': 0, 'msg': '用户添加成功'}, status=201)
        except Exception as e:
            return JsonResponse({'status': 1, 'msg': str(e)}, status=500)

@login_required
def dashboard(req):
    return render(req,"dashboard.html")
