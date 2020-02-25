const maitreRestaurateur = require('./maitre');
const michelin = require('./michelin');

var restaurantMaitre;
var restaurantMichelin;

async function getMaitreRestaurateur () {
  try {
    for (var i=1; i <= 150; i++) maitreRestaurateur.scrapeRestaurant(i)
   restaurantMaitre = maitreRestaurateur.get()
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

async function getMichelin () {
  try {
    restaurantMichelin = await michelin.get()
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function union_arrays (x, y) {
  var obj = {};
  for (var i = x.length-1; i >= 0; -- i)
     obj[x[i]] = x[i];
  for (var i = y.length-1; i >= 0; -- i)
     obj[y[i]] = y[i];
  var res = []
  for (var k in obj) {
    if (obj.hasOwnProperty(k))  // <-- optional
      res.push(obj[k]);
  }
  return res;
}


  
getMichelin(150)
getMaitreRestaurateur();

//console.log(restaurantMichelin);
  //console.log(restaurantMaitre);
  
setTimeout(function() {
  console.log(restaurantMichelin);
  console.log(restaurantMaitre);
  var final = [];
  for (i=0;i<restaurantMichelin.length;i++) {
    for (j=0;j<restaurantMaitre.length;j++) {
      //console.log(restaurantMaitre[i], restaurantMichelin[j])
  //    if(similarity(restaurantMaitre[i].to,restaurantMichelin[j]>0.6)) {
    //      final.push(restaurantMichelin[i]);
      }
    }

  //console.log(final)
}, 30000);


