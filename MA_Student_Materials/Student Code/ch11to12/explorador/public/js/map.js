var map;

/*Initializes and loads the Esri/Leaflet Map*/
function loadMap() {
  /* Center on HRM, zoom level 12 */
  map = L.map('map').setView([44.67, -63.61],
    12);

  L.esri.basemapLayer("NationalGeographic").addTo(
    map);

  parks = JSON.parse(document.getElementById(
    "parkResults").innerHTML);

  var markerGroup = new L.MarkerClusterGroup();
  markerGroup.addLayers(getMarkers());
  markerGroup.addTo(map);

  function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
      .bindPopup("You are here").openPopup();

    L.circle(e.latlng, radius).addTo(map);
  }

  map.on('locationfound', onLocationFound);
}

function featFind(prk) {
    var source = [];
    var seen = [0, 0, 0, 0, 0, 0, 0];
    var count = 0;
    for (var k = 0; k < prk.featTypes.length; k++) {
      if (prk.featTypes[k] == "CRICKET" && seen[0] ==
        0) {
        source[count] =
          "images/icons/Cricket.png";
        seen[0] = 1;
        count++;
      } else if (prk.featTypes[k] == "VOLLEYBALL" &&
        seen[1] == 0) {
        source[count] =
          "images/icons/Volleyball.svg";
        seen[1] = 1;
        count++;
      } else if (prk.featTypes[k] == "BASEBALL" &&
        seen[2] == 0) {
        source[count] =
          "images/icons/Baseball_pictogram.svg";
        seen[2] = 1;
        count++;

      } else if (prk.featTypes[k] == "BEACH" &&
        seen[3] == 0) {
        source[count] =
          "images/icons/beachOrSwimming.jpg";
        seen[3] = 1;
        count++;
      } else if (prk.featTypes[k] ==
        "BOAT LAUNCH SMALL" || prk.featTypes[k] ==
        "BOAT LAUNCH LARGE" && seen[4] == 0) {
        source[count] = "images/icons/boat.svg";
        seen[4] = 1;
        count++;
      } else if (prk.featTypes[k] ==
        "BASKETBALL HOOP" || prk.featTypes[k] ==
        "BASKETBALL COURT" && seen[5] == 0) {
        source[count] =
          "images/icons/basketball.jpg";
        seen[5] = 1;
        count++
      } else if (prk.featTypes[k] == "SOCCER" &&
        seen[6] == 0) {
        source[count] =
          "images/icons/soccerSvg.jpg";
        seen[6] = 1;
        count++
      }
    }
    return source;
  }
  /*Evaluates the list of parks received fromt he servert
    Creates a marker for each park
    Binds the appropriate details to the pop up*/
function getMarkers() {
  var imageHtml = "";
  markerArray = new Array();
  for (var i = 0; i < parks.length; i++) {
    var prk = parks[i];
    var sources = featFind(prk);
    for (var j = 0; j < sources.length; j++) {
      imageHtml += " <img src='" + sources[j] +
        "' width='20' height='20'/> ";
    }

    marker = new L.marker([prk.location.latitude,
        prk.location.longitude
      ])
      .bindPopup("<h3>" + prk.name + "</h3>" +
        toProperCase(prk.featTypes.join(", ")) +
        "<br>" + imageHtml +
        "<br><a class=\"btn btn-success btn-sm\" href='/parkView?id=" +
        prk._id + "'>More</a>");

    markerArray.push(marker);
  }

  /*If only one search result, or in a parkView, center on that park*/
  if (parks.length == 1) {
    console.log('centering on park');
    map.setView([parks[0].location.latitude,
      parks[0].location.longitude
    ], 12);
  }

  return markerArray;
}

function toProperCase(s) {
  return s.toLowerCase().replace(/^(.)|\s(.)/g,
    function ($1) {
      return $1.toUpperCase();
    });
}