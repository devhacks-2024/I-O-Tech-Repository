from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import User  # 假设你的用户模型名为 User
import json
from django.contrib.auth.decorators import login_required

# Create your views here.
def loginPage(req):
    if req.method == "GET":
        return render(req, "login.html")
    elif req.method == "POST":
        try:
            data = json.loads(req.body.decode('utf-8'))  # 确保正确解码请求体
            username = data.get('username')
            password = data.get('password')

            print(username+', '+password)

            user = User.objects.filter(username=username, password=password).first()
            if user:
                req.session['user_id'] = user.id  # 在会话中存储用户ID
                return JsonResponse({'status': 0, 'msg': '登录成功'}, status=200)

            else:
                # 用户名或密码不正确
                return JsonResponse({'status': 1, 'msg': '用户名或密码错误'}, status=401)
        except Exception as e:
            return JsonResponse({'status': 1, 'msg': str(e)}, status=500)


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


def dashboard(req):
    if 'user_id' not in req.session:
        # 用户未登录，重定向到登录页面
        return redirect('/login/')
    # 用户已登录，渲染dashboard页面
    return render(req, "dashboard.html")
