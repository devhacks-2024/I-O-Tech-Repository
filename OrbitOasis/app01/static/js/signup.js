// 假设的用户数据，实际应用中应该发送到服务器
let users = [];

document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // 阻止表单提交默认行为

    // 从表单中获取用户名和密码
    const username = document.getElementById('newUsername').value;
    const password = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmNewPassword').value;

    // 检查密码和确认密码是否匹配
    if (password !== confirmPassword) {
        alert('The passwords do not match.');
        return;
    }

    let data = {
    username: username,
    password: password,
  };

    let xhrSignup = new XMLHttpRequest();
    xhrSignup.open("POST", "/signup", true);
    xhrSignup.onload = () => {
        if (xhrSignup.status === 201){
            alert('Registration successful. Please log in.');
            window.location.href = '/';
        }
    }
    xhrSignup.onerror = () =>
    alert("Something gone wrong, Please try again later");
  xhrSignup.send(JSON.stringify(data));

    // // 检查用户名是否已存在
    // const userExists = users.some(user => user.username === username);
    // if (userExists) {
    //     alert('Username already exists. Please choose another.');
    // } else {
    //     // 添加用户到数组（虚拟数据库）
    //     users.push({ username, password });
    //     alert('Registration successful. Please log in.');
    //     // 重定向到登录页面
    //     window.location.href = './login.html';
    // }
});
