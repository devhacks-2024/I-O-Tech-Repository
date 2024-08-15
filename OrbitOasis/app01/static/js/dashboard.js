var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// 获取 CSRF 令牌
function getCSRFToken() {
    return document.querySelector('meta[name="csrf-token"]').getAttribute('content');
}

// 获取用户位置并处理
function getLocation() {
    var addr, lat, lng;

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
            function (position) {
                lat = position.coords.latitude;
                lng = position.coords.longitude;
                map.setView([lat, lng], 13); // 更新地图中心点

                // 使用Nominatim API进行地理编码
                fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                    .then((response) => {
                        console.log("Geocoding API response received."); // 调试输出
                        if (!response.ok) {
                            throw new Error("Failed to fetch geolocation data");
                        }
                        return response.json();
                    })
                    .then((data) => {
                        console.log("Parsed geocoding data:", data); // 查看返回的数据

                        addr = data.display_name; // 获取地址

                        // 在地图上添加一个标记，并显示地址信息
                        L.marker([lat, lng])
                            .addTo(map)
                            .bindPopup(`Your Location: ${addr}`)
                            .openPopup();

                        console.log("Sending POST request with data:", data); // 调试输出

                        // 获取 CSRF 令牌
                        const csrfToken = getCSRFToken();
                        const location = {"lat": lat, "lng": lng, "addr": addr}

                        return fetch('http://127.0.0.1:8000/dashboard', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'X-CSRFToken': csrfToken // 添加 CSRF 令牌到请求头
                            },
                            body: JSON.stringify(location),  // 将获取的数据作为请求体发送
                        });
                    })
                    .then((response) => {
                        console.log("POST request sent, awaiting response..."); // 调试输出
                        if (!response.ok) {
                            throw new Error("POST request failed");
                        }
                        return response.json();
                    })
                    .then((result) => {
                        console.log('POST 请求成功:', result); // 请求成功
                    })
                    .catch((error) => {
                        console.error('发生错误:', error); // 捕获并显示所有错误
                    });

            },
            function () {
                alert("Unable to retrieve your location");
            }
        );
    } else {
        alert("Geolocation is not supported by your browser");
    }
}


function updateAgenda(lat, lng, addr) {
  const now = new Date();
  const listItem = `<p>Login Time: ${now.toString()}, Lat: ${lat}, Lng: ${lng}</p>`;
  document.getElementById('agendaList').innerHTML = listItem;
}

function hideAllContent() {
  document.getElementById('map').style.display = 'none';
  document.getElementById('jobBoard').style.display = 'none';
  document.getElementById('agenda').style.display = 'none';
  document.getElementById('account').style.display = 'none';
}

function showContent(contentId) {
  hideAllContent();
  document.getElementById(contentId).style.display = 'block';
}

document.querySelectorAll('nav ul li').forEach(item => {
  item.addEventListener('click', function () {
    const contentMap = {
      'Dashboard': 'map',
      'Job Board': 'jobBoard',
      'Agenda': 'agenda',
      'Account': 'account' // Handle Account page display
    };
    const contentId = contentMap[item.textContent.trim()];
    if (contentId === 'agenda') {
      navigator.geolocation.getCurrentPosition(function (position) {
        updateAgenda(position.coords.latitude, position.coords.longitude);
      });
    }
    showContent(contentId);
  });
});

// Event listener for the "Account" link
document.getElementById("accountLink").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent the default link behavior

  let active = document.querySelector(".active");

  if (active != null) {
    active.classList.remove("active");
  }
  showContent("account");
});

document.querySelectorAll("nav li").forEach((item) => {
  item.addEventListener("click", () => {
    let active = document.querySelector(".active");

    if (active != null) {
      active.classList.remove("active");
    }
    item.classList.add("active");
  });
});

function logout(){
  // 发起AJAX请求到Django的登出视图
  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/logout/', true);  // 确保使用正确的URL
  xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 400) {
          // 请求成功，重定向到登录页面
          window.location.href = "/login/";
      } else {
          // 处理错误情况
          console.error('Logout failed');
      }
      window.location.href = "/";
  };
  xhr.onerror = function () {
      // 通信出错
      console.error('Logout request failed');
  };
  xhr.send();
};





// Initial call to display the map (or another default view)
showContent("map");

getLocation();
