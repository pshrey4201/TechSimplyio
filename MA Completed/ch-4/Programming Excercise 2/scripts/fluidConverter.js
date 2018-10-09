function setup() {
  document.getElementById("liter").onclick =
    function () {
      setUnits("G");
    };
  document.getElementById("gallon").onclick =
    function () {
      setUnits("L");
    };
    var input = document.getElementById("volume");
    input.value="";
    input.addEventListener("blur", validateInput);

}

function setUnits(unit) {
  var label = document.getElementById("label");
  label.innerHTML = " " + unit;
}
function validateInput(){
  var label = document.getElementById("label");
  var input = document.getElementById("volume");
  if(label.innerHTML === " L" ){
    if( input.value > 4000 ){
      alert('Volume must be less than or equal to 4000 for Liters');
      input.value="";
    }
  }else{
    if( input.value > 1000 ){
      alert('Volume must be less than or equal to 1000 for Gallons');
      input.value="";
    }

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
