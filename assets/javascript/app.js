$(document).ready(function(){ // everything goes between these
	var windowHeight = $(window).height();

	$(".button-collapse").sideNav();

	$.ajax({
		url: "https://data.cityofchicago.org/resource/787j-mys9.json",
		type: "GET",
		data: {
			"$limit" : 1000,
			"$$app_token" : "rWk97H84NMWrBWcdiG4IvjTjX"
		}

	}).done(function(data) {

		console.log("Retrieved " + data.length + " records from the dataset!");

		console.log(data);

		var mymap = L.map('mapid',{
  		trackResize: true,
  		dragging: true,
  		doubleClickZoom: true,
  		zoomAnimation: true,
  		markerZoomAnimation: true
  	}).setView([41.8781, -87.6298], 15);


  	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
  		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
  		maxZoom: 18,
  		id: 'mapbox.streets',
  		accessToken: 'pk.eyJ1Ijoia2FpdGx5bnN0cmFuZCIsImEiOiJjajhlcmwweWgxNjkzMzNwbTBub3ZuN3FxIn0.1Nz-cdZ8Ew7Oa3dxqxzdaQ'
  	}).addTo(mymap);

  	var potholeOpen = new L.Icon({
        iconUrl: 'assets/images/icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41],
    })

   var potholeClosed = new L.Icon({
        iconUrl: 'assets/images/icon-green.png',
      	shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      	iconSize: [25, 41],
      	iconAnchor: [12, 41],
      	popupAnchor: [1, -34],
      	shadowSize: [41, 41]
    });

    for(var i =0 ; i < data.length; i++){
      var dataLat = data[i].latitude;
      console.log(data[i].latitude);
        var dataLong = data[i].longitude;
        console.log(data[i].longitude);
        var dataStatus = data[i].status;
        console.log(data[i].status);
        
        var dataAddress = data[i].street_address;
        console.log(data[i].street_address);
        var dataAction = data[i].most_recent_action;
        console.log(data[i].most_recent_action);

        if (dataStatus === "Completed") {
        	console.log([dataLat, dataLong], "this  is the info")
        	L.marker([dataLat, dataLong], {icon: potholeClosed}).addTo(mymap).bindPopup("<b>" + data[i].street_address + "</b><br>" + data[i].most_recent_action)
            .openPopup();

        }
        else {
        	 L.marker([dataLat, dataLong], {icon: potholeOpen}).addTo(mymap).bindPopup("<b>" + data[i].street_address + "</b><br>" + data[i].most_recent_action)
            .openPopup();
        }

        //var marker = L.marker([dataLat,dataLong]).addTo(mymap);
    }


  }); // .done function

}); // $(document).ready(function(){});
 
// take string from user entry and .toUppercase 
//create for loop through the "street address" of pothole information and see 
//equal to user entry