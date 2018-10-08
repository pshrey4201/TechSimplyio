var clustersQuery=new Array();
var regionsQuery=new Array();
var sportsActivitiesQuery=new Array();
var kidsQuery=new Array();
var waterQuery=new Array();

var menus={
  main:0,
  sportsActivities:0,
  kids:0,
  water:0
};

//Geolocation interface global variable and options
var longitude = -63.5736;
var latitude = 44.6224;
var geoParams = {
  enableHighAccuracy: true,
  timeout: Infinity,
  maximumAge: 30000
};

var currentMenu=0; //Start as main menu
var snapper;
function initSnapJS()
{
  snapper = new Snap({
    element: document.getElementById('content'),
    disable: 'right'
  });

  //Get users location data
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(pos) {longitude = pos.coords.longitude; latitude = pos.coords.latitude;}); 
  }
  else {
  console.log("No geolocation available");
  longitude = -63.5736;
  latitude = 44.6224;
  }
    //function(position) {pos = position.coords;}, 
    //function error(err) {console.warn('ERROR(' + err.code + '): ' + err.message);},
    //geoParams);

  //Set up for querys
  mainMenuQuery="";
  sportsActivitiesQuery="";
  kidsQuery="";
  waterQuery="";

  document.getElementById("listView").onclick=toggleViews;

  /*Trigger the search on enter key press*/
  $("#search").keypress(function(event){
     console.log("Enter pressed");
     if(event.keyCode == 13){doSearch();}
  });

  checkedTrigger();
  //function to enable slider on clicking
  $("#open-left").click(function()
  {
   if( snapper.state().state=="left" ){
       snapper.close('left');
      } else {
  snapper.open('left');
   }
   });
}

function getLocation()
{
if (navigator.geolocation)
  {
  navigator.geolocation.getCurrentPosition(showPosition);
  }
else{console.log("Geolocation is not supported by this browser")};
}  //end function getLocation()


function checkedTrigger()
{
  $(":checkbox").click(function() {
    getQuery();
    $( event.target ).attr( "checked", !$(event.target).attr("checked"));
    if(event.target.name=="cluster")
    {
      console.log("Cluster value: "+event.target.value);
      var currVal=event.target.value; 
      //The category menus 1,2,3 have submenus
      if((currVal==1 || currVal==2 || currVal==3) && event.target.checked)
      {
        showMenu(event.target.value);
      }
    }
    var value=$(event.target).is(":checked");
    console.log("Value:"+$(event.target).is(":checked"));
    if(event.target.value=="all")
    {
      if(event.target.name=="regions")
      {
        $('#snap-menu').find(':checkbox').each(function(){
            if(this.name=="region")
            {
              jQuery(this).prop('checked', value);
            }
         });
      }
      
      if(event.target.name=="clusters")
      {
        $('#snap-menu').find(':checkbox').each(function(){
            if(this.name=="cluster")
            {
              jQuery(this).prop('checked', value);
            }
         });
      }
    }
  });  

  //Add on click to the menu list items
  //First remove any event listeners if they already exist
  $("li").off("click", lineItemButton);
  $("li").on("click", lineItemButton);
} //end function checkedTrigger()

function lineItemButton(event)
{
  if(event.toElement.localName!="input")
  {
    event.stopPropagation();
    $(this).find(":checkbox").trigger("click");
  }
}

function showMenu(index)
{
  console.log("Showing menu: "+index);
  getQuery();
  saveCurrMenu(currentMenu);
  if(index==0)
  {
    document.getElementById('snap-menu').innerHTML=menus.main;
    currentMenu=index;  
  }
  else if(index==1)  
  {
    if(menus.sportsActivities==0)
    {
      getCleanMenu(index);
    }
    else
    {
      document.getElementById('snap-menu').innerHTML=menus.sportsActivities;
    }
    currentMenu=index;
  }
  else if(index==2)
  {
    if(menus.kids==0)
    {
      getCleanMenu(index);
    }
    else
    {
      document.getElementById('snap-menu').innerHTML=menus.kids;
    }  
    currentMenu=index;
  }
  else if(index==3)
  {
    if(menus.water==0)
    {
      getCleanMenu(index);
    }
    else
    {
      document.getElementById('snap-menu').innerHTML=menus.water;
    }
    currentMenu=index;  
  }

  checkedTrigger();
}  //end function showMenu(index)

function saveCurrMenu(index)
{
  if(index==0)
  {
    menus.main=document.getElementById('snap-menu').innerHTML;
  }
  else if(index==1)  
  {
    menus.sportsActivities=document.getElementById('snap-menu').innerHTML;
  }
  else if(index==2)
  {
    menus.kids=document.getElementById('snap-menu').innerHTML;
  }
  else if(index==3)
  {
    menus.water=document.getElementById('snap-menu').innerHTML;
  }
}  //end function saveCurrMenu(index)


function getCleanMenu(index)
{
  if(index==1)  
  {
    document.getElementById('snap-menu').innerHTML='<h3 id="sportsMenu"> </h3>' +
      '<br><br><br><br>' +
      '<a class="btn btn-left" href="#" hidefocus="true" onclick="showMenu(0)" style="outline: medium none; opacity: 1; padding-left: 5px; padding-bottom: 5px">'+
      '<span class="gradient">Back</span></a>'+
      '<ul>' +
      '<li><label>Soccer</label><input type="checkbox" name="soccer" checked value="0"></li>' +
      '<li><label>Ultimate Frisbee</label><input type="checkbox" name="Ultimate Frisbee" checked value="1"></li>' +
      '<li><label>Cricket</label><input type="checkbox" name="cricket" checked value="2"></li>' +
      '<li><label>Rugby</label><input type="checkbox" name="Rugby" checked value="3"></li>' +      
      '<li><label>Baseball</label><input type="checkbox" name="Baseball" checked value="4"></li>' +
      '<li><label>Basketball</label><input type="checkbox" name="Basketball" checked value="5"></li>' +
      '<li><label>Tennis</label><input type="checkbox" name="Tennis" checked value="6"></li>' +
      '<li><label>Ball Hockey</label><input type="checkbox" name="Ball Hockey" checked value="7"></li>' +
      '<li><label>Volleyball</label><input type="checkbox" name="Volleyball" checked value="8"></li>' +
      '<li><label>Lacrosse</label><input type="checkbox" name="Lacrosse" checked value="9"></li>' +
      '<li><label>Horseshoe</label><input type="checkbox" name="Horseshoe" checked value="10"></li>' +
      '<li><label>Lawn Bowling</label><input type="checkbox" name="Lawn Bowling" checked value="11"></li>' +
      '<li><label>Running Track</label><input type="checkbox" name="Running Track" checked value="12"></li>' +
      '<li><label>Outdoor Gym</label><input type="checkbox" name="Outdoor Gym" checked value="13"></li>' +
      '<li><label>Dirt Jump</label><input type="checkbox" name="Dirt Jump" checked value="14"></li>' +      
      '<li><label>Modular Ramps</label><input type="checkbox" name="Modular Ramps" checked value="15"></li>' +
      '<li><label>Concrete Park</label><input type="checkbox" name="Concrete Park" checked value="16"></li>' +
      '<li><label>General</label><input type="checkbox" name="General" checked value="17"></li>' +
      '<li><label>Shuffleboard</label><input type="checkbox" name="Shuffleboard" checked value="18"></li>' +
      '<li><label>Outdoor Rink</label><input type="checkbox" name="Outdoor Rink" checked value="19"></li>' +
      '<li><label>Trails</label><input type="checkbox" name="Trails" checked value="20"></li>' +
      '</ul>';
  }
  else if(index==2) //kidsMenu index
  {
    document.getElementById('snap-menu').innerHTML='<h3 id="kidsMenu"> </h3>' +
      '<br><br><br><<br>' +
      '<a class="btn btn-left" href="#" hidefocus="true" onclick="showMenu(0)" style="outline: medium none; opacity: 1; padding-left: 5px; padding-bottom: 5px">'+
      '<span class="gradient">Back</span></a>'+
      '<ul>' +
      '<li><label>Playfield</label><input type="checkbox" name="Playfield" checked value="21"></li>' +
      '<li><label>Playground</label><input type="checkbox" name="Playground" checked value="22"></li>' +
      '<li><label>Outdoor Rink</label><input type="checkbox" name="Outdoor Rink" checked value="23"></li>' +
      '<li><label>Indoor Pool</label><input type="checkbox" name="Indoor Pool" checked value="24"></li>' +
      '<li><label>Outdoor Pool</label><input type="checkbox" name="Outdoor Pool" checked value="25"></li>' +      
      '</ul>';
  }
  else if(index==3) //waterMenu index
  {
    document.getElementById('snap-menu').innerHTML='<h3 id="waterMenu"> </h3>' +
      '<br><br><br><<br>' +
      '<a class="btn btn-left" href="#" hidefocus="true" onclick="showMenu(0)" style="outline: medium none; opacity: 1; padding-left: 5px; padding-bottom: 5px">'+
      '<span class="gradient">Back</span></a>'+
      '<ul>' +
      '<li><label>Beach</label><input type="checkbox" name="Beach" checked value="26"></li>' +
      '<li><label>Spray Pool</label><input type="checkbox" name="Spray Pool" checked value="27"></li>' +
      '<li><label>Indoor Pool</label><input type="checkbox" name="Indoor Pool" checked value="28"></li>' +
      '<li><label>Outdoor Pool</label><input type="checkbox" name="Outdoor Pool" checked value="29"></li>' +
      '<li><label>Wharf</label><input type="checkbox" name="Wharf" checked value="30"></li>' +      
      '<li><label>Boat Launch Large</label><input type="checkbox" name="Boat Launch Large" checked value="31"></li>' +
      '<li><label>Boat Launch Small</label><input type="checkbox" name="Boat Launch Small" checked value="32"></li>' +
      '</ul>';
  }
}  //end function getCleanMenu(index)

function getQuery()
{
  //Arrays to carry all selected values of each type
    //MainMenu
  var regions=new Array();
  var clusters=new Array();

    //Submenus
  var featTypes=new Array();

  $('#snap-menu').find(':checkbox').each(function()
  {
    //For the categories
    if(this.checked && this.name=='cluster')
    {
      clusters.push(this.value);
    }
    else if(this.checked && this.name=='region')
    {
      regions.push(this.value);
    }
    else if(this.checked && this.name!='location' && this.value!="all")
    {
      featTypes.push(this.value);
    }
  })

  /*When we change to a submenu, we save the query
   *So, if we're a menu with featTypes, then we've saved the 
   *main menu, otherwise, we've saved a submenu (if any)
   */
   if(featTypes.length>0)
   {
     //We're in a submenu
     if(featTypes[0]>20 && featTypes[0]<26)
     {
       //In Kids Menu
       kidsQuery=featTypes;
     }
     else if(featTypes[0]>25)
     {
       //In Water Menu
       waterQuery=featTypes;
     }
     else
     {
       //In sports menu
       sportsActivitiesQuery=featTypes;
     }
   }
   else
   {
     //In main menu
     regionsQuery=regions;
     clustersQuery=clusters;
   }

   var request={};
   if(document.getElementById("mapView"))
   {
     request.view="map";
   }
   else
   {
     request.view="list";
   }

   //request.view="map"; //DEBUG->TESTING
   request.clusters=clustersQuery;
   request.geolocation=[latitude, longitude];
   request.regions=regionsQuery;
   request.featTypes=new Array();

   if(sportsActivitiesQuery.length>0)
   {
     request.featTypes=request.featTypes.concat(sportsActivitiesQuery);
   }

   if(kidsQuery.length>0)
   {
     request.featTypes=request.featTypes.concat(kidsQuery);
   }

   if(waterQuery.length>0)
   {
     request.featTypes=request.featTypes.concat(waterQuery);
   }


  //Print 'request' to client's console
  console.log("Snap client: " +request);

  //Jquery/AJAX POST of request
  $.ajax({
    type: "POST",
    url: "/parkGrab",
    data: JSON.stringify(request),
    success: successful 
  });
  return request;
}  //end function getQuery()


function successful(data)
{
  //console.log("Success! Position: " +longitude + " , " +latitude );
  if(data!="")
  {
     var content=document.getElementById("content");
     content.innerHTML=data;
     
     if(data.indexOf("id='map'")!==-1)
     { 
    loadMap();
     }
  }
}  //end function successful(data)


function doSearch()
{
  var term=document.getElementById("search");
  if(term.value!="")
  {

   var request={};

   if(document.getElementById("mapView"))
   {
      request.view="map";
   }
   else
   {
      request.view="list";
   }

   request.search=term.value;
   request.geolocation=[latitude, longitude];
   console.log(request);

   //Jquery/AJAX POST of request
   $.ajax({
     type: "POST",
     url: "/parkGrab",
     data: JSON.stringify(request),
     success: successful
   });
   snapper.close();
  }
}  //end of function doSearch()

function saveCurrMenuQuery(currQuery)
{
  if($('#mainMenu').length>0)
  {
    mainMenuQuery=currQuery;
  }
  else if($('#sportsMenu').length>0)
  {
    sportsActivitiesQuery=currQuery;
  }
  else if($('#kidsMenu').length>0)
  {
    kidsQuery=currQuery;
  }
  else if($('#waterMenu').length>0)
  {
    waterQuery=currQuery;
  }
}  //end function saveCurrMenuQuery(currQuery)

function toggleViews()
{
  if(this.id=="listView")
  {
    //In List View
    var toggler=document.getElementById("listView");
    toggler.id="mapView";
    toggler.innerHTML="List";
    toggler.onclick=toggleViews;
  }
  else
  {
    var toggler=document.getElementById("mapView");
    toggler.id="listView";
    toggler.innerHTML="Map"; 
    toggler.onclick=toggleViews;
  }
  getQuery();
}  //end of function toggleViews()
