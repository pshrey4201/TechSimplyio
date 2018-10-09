function setup() {
  document.getElementById("liter").onclick =
    function () {
      setUnits("G");
    };
  document.getElementById("gallon").onclick =
    function () {
      setUnits("L");
    };
}

function setUnits(unit) {
  var label = document.getElementById("label");
  label.innerHTML = " " + unit;
  var units = document.getElementById("units");
  if (unit === "L") {
    units.innerHTML = "Liters";
  }else{
    units.innerHTML = "Gallons";
  }
}

function convert() {
  var gallonButton = document.getElementById(
    "gallon");
  var volume = document.getElementById(
    "volume");

  if (gallonButton.checked) {
    convertToGallon(volume.value);
  } else {
    convertToLiter(volume.value);
  }
}

function convertToGallon(volumeInLiter) {
  var gallonVolume = volumeInLiter / 3.78541;
  document.getElementById("answer").innerHTML =
    volumeInLiter +
    " Liter converts to " +
    gallonVolume.toFixed(1) +
    " Gallon";
}

function convertToLiter(volumeInGallon) {
  var literVolume = volumeInGallon  * 3.78541;
  document.getElementById("answer").innerHTML =
    volumeInGallon +
    " Gallon converts to " +
    literVolume.toFixed(1) +
    " Liter";
}
