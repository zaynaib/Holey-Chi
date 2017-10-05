
$.ajax({
    url: "https://data.cityofchicago.org/resource/787j-mys9.json",
    type: "GET",
    data: {
      "$limit" : 5,
      "$$app_token" : "rWk97H84NMWrBWcdiG4IvjTjX"
    }

}).done(function(data) {
  alert("Retrieved " + data.length + " records from the dataset!");
  console.log(data);
});

var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FpdGx5bnN0cmFuZCIsImEiOiJjajhlcmwweWgxNjkzMzNwbTBub3ZuN3FxIn0.1Nz-cdZ8Ew7Oa3dxqxzdaQ'
}).addTo(mymap);