/**
 *    explorador
 *    Created for the HRM apps4halifax contest
 *    Saint Mary's University, 2013
 *
**/

// Module dependencies
var express = require('express');
var expressHandlebars = require('express3-handlebars');
var errorHandler = require('errorhandler');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan'); // Logging
var methodOverride = require('method-override');
var ParkProvider = require('./parkMongoHandler.js').ParkProvider;
var app = express();

// Environment setup
app.set('port', process.env.PORT || 8080);  //change port here
app.engine('handlebars', expressHandlebars({defaultLayout:'header'}));
app.set('view engine', 'handlebars');
app.use(favicon(__dirname + '/public/images/icons/favicon.ico'));
app.use(morgan('dev'));
app.use(rawBody);  //app.use(express.bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// Development only
if ('development' == app.get('env')) {
  app.use(errorHandler());
}

// Setup the mongo handler. Specify local and port number.
var parkMongoGrab = new ParkProvider('127.0.0.1', 27017);

// Custom middleware to replace express.bodyParser()
function rawBody(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
  req.rawBody += chunk;
  });
  req.on('end', function(){
  next();
  });
}



// ---------- Begin Express Routes ----------


//Landing page routes to tutorial
app.get('/', function(req, res){
  var context = {
    menuContext: {
      regions: ['Halifax', 'Dartmouth', 'Bedford', 
                'Sackville', 'Eastern Shore', 'Outer HRM'],
      categories: ['Sports & Activities +', 'Kid Friendly +', 
                   'Water Activities +', 'Big Parks', 
                   'Small Community Parks']
    }, 
    helpers: {
      addOne: function(value) {
        return parseInt(value, 10)+1;
      }
    }
  };

  res.render('tutorial', context);
});

//Route to individual park page
app.get('/parkView', function(req, res){

  var query="{\"_id\":"+req.query.id+"}"; 
  query=JSON.parse(query);

  console.log('Checking query (rawBody):', query);
  //query="{'clusters.1':{$gt:0.1}, featTypes: {$in:['CRICKET']}}";
  parkMongoGrab.findAll(JSON.stringify(query), function(error, prks){
  
    console.log('findAll callback:       ', prks);
    if(prks.length>0)
    {
      res.render('parkView', {
          park: prks[0],
          helpers: {
            ifEqual: function(a, b, options) {
              if(a == b) {
                return options.fn(this);
              }
              return options.inverse(this);
            }, 
            stringify: function(object) {
              return JSON.stringify(object);
            },
            formatFeatTypes: function(featTypes) {
              var featuresString = new String(featTypes.join(', '));
              return featuresString.toLowerCase().replace(/^(.)|\s(.)/g, function($1) {
                return $1.toUpperCase();
              });
            }
          }
      });
    }
  });

});

//Route for POSTing park queries
app.post('/parkGrab', function(req, res){

  var regions=new Array();
  regions[0]="Halifax";
  regions[1]="Dartmouth";
  regions[2]="Bedford";
  regions[3]="Sackville";
  regions[4]="EasternShore";
  regions[5]="OuterHRM";

  //All Sports and Activities values will be values 0-20
  //Kids values will be 21-
  var featTypes=new Array();
  featTypes[0]="Soccer";
  featTypes[1]="Ultimate Frisbee";
  featTypes[2]="Cricket";
  featTypes[3]="Rugby";
  featTypes[4]="Baseball";
  featTypes[5]="Basketball";
  featTypes[6]="Tennis";
  featTypes[7]="Ball Hockey";
  featTypes[8]="Volleyball";
  featTypes[9]="Lacrosse";
  featTypes[10]="Horseshoe";
  featTypes[11]="Lawn Bowling";
  featTypes[12]="Running Track";
  featTypes[13]="Outdoor Gym";
  featTypes[14]="Dirt Jump";
  featTypes[15]="Modular Ramps";
  featTypes[16]="Concrete Park";
  featTypes[17]="General";
  featTypes[18]="Shuffleboard";
  featTypes[19]="Outdoor Rink";
  featTypes[20]="Trails";

  featTypes[21]="Playfield";
  featTypes[22]="Playground";
  featTypes[23]="Outdoor Rink";
  featTypes[24]="Indoor Pool";
  featTypes[25]="Outdoor Pool";

  featTypes[26]="Beach";
  featTypes[27]="Spray Pool";
  featTypes[28]="Indoor Pool";
  featTypes[29]="Outdoor Pool";
  featTypes[30]="Wharf";
  featTypes[31]="Boat Launch Large";
  featTypes[32]="Boat Laundh Small";

  var indices=JSON.parse(req.rawBody);

  console.log("Received: %j", indices);
  
  if('search' in indices)
  {
    var query="{\"name\":{\"$regex\":\""+indices.search.toUpperCase()+"\"}}";  
  }
  else
  {

  var regionsFind="";
  var clustersFind="";
  var featTypesFind="";

  //Minimum threshold for the fuzzy cluster
  var minClusterThresh=0.1;

  //Main Menu Query
  //Construct clusters query
  if(indices.clusters.length>0)
  {
    for(var i=0; i<indices.clusters.length; i++)
    {
      clustersFind+="\"clusters."+indices.clusters[i]+"\":{\"$gt\":"+minClusterThresh+"}";
      if(i!=indices.clusters.length-1)
      {
        clustersFind+=",";
      }
    }
  }

  //Construct regions query
  if(indices.regions.length>0)
  {
    regionsFind="\"region\": {\"$in\":[\""
    for(var i=0; i<indices.regions.length; i++)
    {
      regionsFind+=regions[indices.regions[i]]+"\"";
      if(i!=indices.regions.length-1)
      {
        regionsFind+=",\"";
      }
    }

    regionsFind+="]}";

    if(indices.clusters.length>0)
    {
      regionsFind=", "+regionsFind;
    }
  }

  //Construct featTypes query
  var featArr=new Array();
  var featQuery;
  if(indices.featTypes.length>0)
  {
    featTypesFind="\"featTypes\": {\"$in\":"
    for(var i=0; i<indices.featTypes.length; i++)
    {
      featArr.push(featTypes[indices.featTypes[i]].toUpperCase());
    }
    featTypesFind+=JSON.stringify(featArr);
    featTypesFind+="}";

    if(indices.clusters.length>0 || indices.regions.length>0)
    {
      featTypesFind=", "+featTypesFind;
    }
  }

  query="{"+clustersFind+regionsFind+featTypesFind+"}";
  console.log(query);

}

 query=JSON.parse(query);
  //console.log('Checking query (rawBody):', query);
  //query="{'clusters.1':{$gt:0.1}, featTypes: {$in:['CRICKET']}}";
  parkMongoGrab.findAll(JSON.stringify(query), function(error, prks){
    //console.log('findAll callback:       ', prks);
    if(prks.length>0)
    {

        for (var i=0; i<prks.length; i++) {
          var R = 6371; // Radius of the earth in km
          var lat2 = indices.geolocation[0];
          var lon2 = indices.geolocation[1];
          var lat1 = prks[i].location.latitude;
          var lon1 = prks[i].location.longitude;
          var dLat = (lat2-lat1)*Math.PI/180.0  // Javascript functions in radians
          var dLon = (lon2-lon1)*Math.PI/180.0
          var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                  Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * 
                  Math.sin(dLon/2) * Math.sin(dLon/2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var dist = R * c; // Distance in km
          prks[i].distance = dist.toFixed(2);
        }

	if(indices.view=="list")
	{
		console.log('Asking for list view');
        res.render('resultsList', {
                      layout: false,
	                    parks:prks,
                      helpers: {
                        formatFeatTypes: function(featTypes) {
                          var featuresString = new String(featTypes.join(', '));
                          return featuresString.toLowerCase().replace(/^(.)|\s(.)/g, function($1) {
                            return $1.toUpperCase();
                          });
                        }
                      }
		});
	}
	else if(indices.view=="map")
	{
		console.log('Asking for map view');
	
		res.render('resultsMap', {
         layout:false,
			   parks:prks,
         helpers: {
            stringify: function(object) {
              return JSON.stringify(object);
            }
         }
	        });
	}
    }
  return;
  });


});


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
