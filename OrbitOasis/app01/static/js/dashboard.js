var map = L.map("map").setView([51.505, -0.09], 13);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

// 获取用户位置
function getLocation() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;
        map.setView([lat, lng], 13); // 更新地图中心点

        // 使用Nominatim API进行地理编码
        fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data); // 查看返回的数据
            var addr = data.display_name; // 获取地址
            L.marker([lat, lng])
              .addTo(map)
              .bindPopup(`Your Location: ${addr}`)
              .openPopup();
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

function hideAllContent() {
  document.getElementById('map').style.display = 'none';
  document.getElementById('jobBoard').style.display = 'none';
  document.getElementById('agenda').style.display = 'none';
  document.getElementById('account').style.display = 'none'; // Add this line
}

// Show content based on clicked item
function showContent(contentId) {
  hideAllContent();
  document.getElementById(contentId).style.display = 'block';
}

// Event listeners for nav menu items
document.querySelectorAll('nav ul li').forEach(item => {
  item.addEventListener('click', function() {
    const contentMap = {
      'Dashboard': 'map',
      'Job Board': 'jobBoard',
      'Agenda': 'agenda',
    };
    const contentId = contentMap[item.textContent.trim()];
    if(contentId) showContent(contentId); // Check if contentId exists to avoid errors
  });
});

// Event listener for the "Account" link
document.getElementById('accountLink').addEventListener('click', function(e) {
  e.preventDefault(); // Prevent the default link behavior
  showContent('account');
});

// Initial call to display the map (or another default view)
showContent('map');

getLocation();
