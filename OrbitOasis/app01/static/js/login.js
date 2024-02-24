document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let xhrLogin = new XMLHttpRequest();
  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  var csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
  // 更正为 xhrLogin
  xhrLogin.open("POST", "/", true);

  xhrLogin.setRequestHeader("Content-Type", "application/json");
  xhrLogin.setRequestHeader("X-CSRFToken", csrftoken);

  xhrLogin.onload = () => {
    // 更正为 xhrLogin.status
    if (xhrLogin.status === 200) {
      window.location.href = "./dashboard"
    }else{
      alert("Invalid username or password");
    }
  };
  xhrLogin.onerror = () =>
    alert("Something gone wrong, Please try again later");
  xhrLogin.send(JSON.stringify(data));
});
