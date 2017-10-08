$(document).ready(function(){ //manipulate the DOM once the page is loaded
	var windowHeight = $(window).height();

	$(".button-collapse").sideNav();

  buildMap();

  var userSearch;
  window.addEventListener("keypress", function(event){
    
      if(event.which === 13) {
        event.preventDefault();
        alert('You pressed enter!');
        userSearch = $("#search").val();
        userSearch = userSearch.toUpperCase();
        console.log(userSearch);
        //doSearch(); 
      }
      

  });
	
});
 
// take string from user entry and .toUppercase 
//create for loop through the "street address" of pothole information and see 
//equal to user entry

function buildMap(){


  $.ajax({
    url: "https://data.cityofchicago.org/resource/787j-mys9.json",
    type: "GET",
    data: {
      "$limit" : 5,
      "$$app_token" : "rWk97H84NMWrBWcdiG4IvjTjX"
    }

  }).done(function(data) {

    //console.log("Retrieved " + data.length + " records from the dataset!");

    console.log(data);

    //initalize map
    var mymap = L.map('mapid',{
    trackResize: true,
    dragging: true,
    doubleClickZoom: true,
    zoomAnimation: true,
    markerZoomAnimation: true
  }).setView([41.8781, -87.6298], 15);


  //create and add map layer
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1Ijoia2FpdGx5bnN0cmFuZCIsImEiOiJjajhlcmwweWgxNjkzMzNwbTBub3ZuN3FxIn0.1Nz-cdZ8Ew7Oa3dxqxzdaQ'
  }).addTo(mymap);

  //data point icon for open pothole request
  var potholeOpen = new L.Icon({
      iconUrl: 'assets/images/icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],

  })

  //data point icon for closed pothole request
   var potholeClosed = new L.Icon({
        iconUrl: 'assets/images/icon-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
    });


    //loop through the pothole data
    for(var i =0 ; i < data.length; i++){

      //get the latitude
      var dataLat = data[i].latitude;
      console.log(data[i].latitude);

      //get the longitude
      var dataLong = data[i].longitude;
      console.log(data[i].longitude);

      //get the status of the pothole request
      var dataStatus = data[i].status;
      console.log(data[i].status);
        
     //get the address of the datapoint   
     var dataAddress = data[i].street_address;
     console.log(data[i].street_address);

     //get the log report of the pothole
     var dataAction = data[i].most_recent_action;
     console.log(data[i].most_recent_action);

      //if the pothole status is completed show green else show red
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


}); // $(document).ready(function(){});
}





var userSearch;
  window.addEventListener("keypress", function(event){
    
      if(event.which === 13) {
        event.preventDefault();
        //alert('You pressed enter!');
        userSearch = $("#search").val();
        userSearch = userSearch.toUpperCase();
        //doSearch(); 
      }
      

  });
