document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();

  let xhrLogin = new XMLHttpRequest();
  let data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
  };

  // 更正为 xhrLogin
  xhrLogin.open("POST", "/login", true);
  xhrLogin.setRequestHeader("Content-Type", "application/json");
  xhrLogin.onload = () => {
    // 更正为 xhrLogin.status
    if (xhrLogin.status === 200) {
      // let xhrDashboard = new XMLHttpRequest();
      alert("Not implement");
    } else {
      alert("Invalid username or password");
    }
  };
  xhrLogin.onerror = () =>
    alert("Something gone wrong, Please try again later");
  xhrLogin.send(JSON.stringify(data));
});

document.getElementById("signUp").addEventListener("click", () => {
  let xhrLogin = new XMLHttpRequest();
  xhr.open("GET", "/signup", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhrLogin.onload = () => {
    if (xhr.status === 200) {
      let htmlContent = JSON.parse(xhr.responseText);

      let newWindow = window.open();
      newWindow.document.open();
      newWindow.document.write(htmlContent);
      newWindow.document.close();
    }
  };
  xhrLogin.onerror = () =>
    alert("Something gone wrong, Please try again later");
  xhrLogin.send();
});
