// console.log("RASAK");
// console.log(ras_ak);

mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubWF0aGVzb24iLCJhIjoiY2lmZDhyZXVxNTI5eHNtbHgyOTYwbHJtMyJ9.Ch8JQXvunpUrv6tGpeJMCA'

// var outerDiv = document.getElementById("map1");
// console.log(outerDiv)

// outerDiv.ontouchmove = touchmo;

// function touchmo (e){
//   // e.stopPropagation();

// e.preventDefault();
// console.log("PREVENTINTOUGHMO")
// }

// outerDiv.onmousedown=modo;

// function modo (e){
//   // e.stopPropagation();

// e.preventDefault();
// console.log("PREVENTINMODO");
// }














// var mapChildren = document.querySelector(".mapboxgl-popup");
// console.log("mapchildren ");
// console.log(mapChildren);

// mapChildren.ontouchmove = kidsProp;

// function kidsProp (e){
//   e.stopPropagation();

// // e.preventDefault();
// }








var map = new mapboxgl.Map({
  container: 'map1',
  // style: 'mapbox://styles/mapbox/light-v9',
  style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',
  center: [-1,12],
  zoom: 4.2
//   "transition": {
//   "duration": 800
//   // "delay": 200
// }
});


var hoveredStateId =  null;

// var red = './data/ras_ak_red.geojson';
var fake = './data/ras_ak_fake.geojson';


var ak_simple_fake = './data/alaska_fake.geojson';
// var cities_fake = './data/city_labels_fake.geojson';
var cities_fake = './data/cities_fake.geojson';
// cities_fake.geojson

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: true
    });



map.on('load', function() {




var canv = document.querySelector(".mapboxgl-canvas");
// console.log(canv)

canv.ontouchmove = canvtouchmo;

function canvtouchmo (e){
  // e.stopPropagation();

e.preventDefault();

}


map.addSource('cities', {
  type:'geojson',
  data: cities_fake,
   "maxzoom": 10

})


map.addSource('ras1', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: fake,
  generateId: true,
  "buffer": 0,

     "maxzoom": 10

     // cluster: true,
     //    clusterMaxZoom: 14, // Max zoom to cluster points on
     //    clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
});

map.addSource('rasShape', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: ak_simple_fake,
   "maxzoom": 10
});






  map.addLayer({
        "id": "rasAk",
        "type": "fill",
      "source": "rasShape",

      "interactive": "false",


    'paint': {

            "fill-color": "#f4f4f2"

    }


        



      })






////#### the circles 


  map.addLayer({
        "id": "ras2",
        "type": "circle",
   		"source": "ras1",
      "minzoom": 3,


		'paint': {
            // make circles larger as the user zooms from z12 to z22
            // 'circle-radius': {
            //     // 'base': 20,
            //     'stops': [[12, 7], [22, 20]]
            // },

// 'circle-radius': 8,

  'circle-radius': {
                // 'base': 7,
                'stops': [[5, 10], [12, 30]]
            },



// [
//                 'match',
//                 ['get', 'loc'],
//                 'Anchorage, AK', 18,
//                 'Juneau, AK', 9,
//                 'Fairbanks, AK', 14,
//                 /* other */ 6
//             ],//##CLUSTERING//

// "circle-radius": [
//                 "step",
//                 ["get", "point_count"],
//                  5,
//                 10,
//                 30,
//                 25,
//                 35
//             ],

//** reinstate circle color //


            // 'circle-color': "rgba(0,0,0,.55)",
            // 'circle-stroke-width': 1.4,
            // 'circle-stroke-color': "rgba(0,0,0,.00)",

            

            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': [
                'match',
                ['get', 'Program'],
                'Small Grants', '#4789c8 ',
                'Large Grants', '#72cac3',
                'Individual Artist Award', '#e09641',
                'Foundation Initiatives', '#a5c6be',
                'Sabbatical', '#a5c6be',
                /* other */ 'purple'
            ],

            
//             "circle-opacity": ["case",
// ["boolean", ["feature-state", "hover"], false],
// 1,
// 0.5
// ],
"circle-stroke-width": ["case",
["boolean", ["feature-state", "hover"], false],
1.7,
0
]

            // 'circle-stroke-color': "darkblue",
            // 'circle-stroke-width': 1,
            // 'circle-color': 'rgba(0,0,0,0)'
        }





   		})


map.addLayer({
        "id": "cities1",
        "type": "symbol",
      "source": "cities",
      "interactive": "false",


        "layout": {
            "text-field": "{community}",
                        "text-offset": [1, 5.5],

            "text-font": ["Arial Unicode MS Bold", "Open Sans Bold"],
            // "text-font": ["Fira Sans Regular"],
            "text-size": 12,
            "text-anchor": "bottom-right",
            "text-offset": [3.5,.8]
          // "text-offset-distance": "10px"
                  // "text-allow-overlap": true,
                    // "text-ignore-placement": true

            // "text-weight": "bold"
        },




    'paint': {
            // make circles larger as the user zooms from z12 to z22
            // 'circle-radius': 3,*********
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
                    "text-halo-color": "#ffffff",
                    "text-halo-width": .9,
                    "text-halo-blur": .4,


            // // 'circle-stroke-color': "darkblue",
            // 'circle-stroke-width': 0,
            // 'circle-color': 'rgba(0,0,0,0)'
        }





      })



 // ["in", "class", "street_major", "street_minor", "street_limited"]

map.scrollZoom.disable();

// map.dragPan.disable();

//The new one.



// // // disable map rotation using right click + drag
// map.dragRotate.disable();

// // disable map rotation using touch rotation gesture
// map.touchZoomRotate.disableRotation();


//###** things to try

//1. disable drag stuff
//2. remove on touch. 
//compile.




map.on("mousemove", "ras2", function(e) {
  if (e.features.length > 0) {
  if (hoveredStateId) {
  map.setFeatureState({source: 'ras1', id: hoveredStateId}, { hover: false});
  }
  hoveredStateId = e.features[0].id;
  map.setFeatureState({source: 'ras1', id: hoveredStateId}, { hover: true});
  }
  });



map.addControl(new mapboxgl.NavigationControl());

// map.addControl(new mapboxgl.Navigation({position: 'top-left'}));




})


var currentProgram = 'allPrograms';

function allGrants () { 

map.setFilter('ras2', ['in', 'Program', 'Small Grants', 'Large Grants', 'Sabbatical', "Individual Artist Award"]);

currentProgram = 'allPrograms';
console.log("CURR PROG");
console.log(currentProgram);

// map.setPaintProperty('ras2',  'circle-color', "rgba(0,0,0,.5)");
// map.setPaintProperty('ras2',  'circle-stroke-color', "rgba(0,0,0,.8)");

map.setPaintProperty('ras2',  'circle-color',[
                'match',
                ['get', 'Program'],
                'Small Grants', '#4789c8 ',
                'Large Grants', '#72cac3',
                'Individual Artist Award', '#e09641',
                'Foundation Initiated', '#a5c6be',
                'Sabbatical', '#a5c6be',
                /* other */ 'green'
            ])



}

function t1 () {

map.setFilter('ras2', ['in', 'Program', 'Small Grants']);

currentProgram =  "Small Grants";



// console.log("CURR PROG");
// console.log(currentProgram);


map.setPaintProperty('ras2',  'circle-color',[
                'match',
                ['get', 'Program'],
                'Small Grants', '#4789c8',
                'Large Grants', '#72cac3',
                'Individual Artist Award', '#e09641',
                'Foundation Initiated', '#a5c6be',
                'Sabbatical', '#a5c6be',
                /* other */ 'green'
            ])

}


function t2() {
map.setFilter('ras2', ['in', 'Program', 'Large Grants']);

currentProgram =  "Large Grants";
// console.log("CURR PROG");
// console.log(currentProgram);
map.setPaintProperty('ras2',  'circle-color',[
                'match',
                ['get', 'Program'],
                'Small Grants', '#4789c8 ',
                'Large Grants', '#72cac3',
                'Individual Artist Award', '#e09641',
                'Foundation Initiated', '#a5c6be',
                'Sabbatical', '#a5c6be',
                /* other */ 'green'
            ])

}


function iaa() {
map.setFilter('ras2', ['in', 'Program', 'Individual Artist Award']);

currentProgram =  "Individual Artist Award";
// console.log("CURR PROG");
// console.log(currentProgram);

map.setPaintProperty('ras2',  'circle-color',[
                'match',
                ['get', 'Program'],
                'Small Grants', '#4789c8 ',
                'Large Grants', '#72cac3',
                'Individual Artist Award', '#e09641',
                'Foundation Initiated', '#a5c6be',
                'Sabbatical', '#a5c6be',
                /* other */ 'green'
            ])
}


function sabbatical() {
map.setFilter('ras2', ['in', 'Program', 'Sabbatical']);
currentProgram =  "Sabbatical";

// console.log("CURR PROG");
// console.log(currentProgram);
map.setPaintProperty('ras2',  'circle-color',[
                'match',
                ['get', 'Program'],
                'Small Grants', '#4789c8 ',
                'Large Grants', '#72cac3',
                'Individual Artist Award', '#e09641',
                'Foundation Initiated', '#a5c6be',
                'Sabbatical', '#a5c6be',
                /* other */ 'green'
            ])

}


function statewide () {

// console.log("statewide function");

// map.setFilter('ras2', ['in', 'Program', 'Foundation Initiative']);
// currentProgram =  "statewide";

// console.log("CURR PROG");
// console.log(currentProgram);
// map.setPaintProperty('ras2',  'circle-color',[
//                 'match',
//                 ['get', 'Program'],
//                 'Tier 1', '#4789c8 ',
//                 'Tier 2', '#72cac3',
//                 'Individual Artist Award', '#e09641',
//                 'Foundation Initiated', '#a5c6be',
//                 'Sabbatical', '#a5c6be',
//                 /* other */ 'green'
//             ])

var statewideData = ras_ak.filter(d=>d.ProjectLocation =="Statewide" || d.Program =="Foundation Initiatives")

statewideData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))


var popMultipleState = statewideData.map(function (el) {



  return `<h4> ${el.OrganizationName+'\u00A0\u00A0'}- $${el.AwardAmount.toLocaleString()}</h4>
 <p class="indent">${el.Description}</p>
         <br />`

                })

  var popDivState = ` <div class="popupCloseButton">X</div> <h4 id="locState" style="background-color:#333333">Statewide and Other Initiatives</h4><div class="pop">${popMultipleState.join('')}</div>`



document.querySelector('.statewide').classList.add("vis");
// document.querySelector('.statewideInner').classList.add("vis");

document.querySelector('.statewideInner').innerHTML = popDivState;


console.log("statewdieinner");

console.log(document.querySelector('.statewideInner'))

console.log(document.querySelector('.statewideInner').innerHTML == popDivState);

// if (document.querySelector('.statewideInner') == popDivState) {

// document.querySelector(".map").addEventListener('click', function () {

// document.querySelector('.statewide').classList.remove("vis");
// console.log("insdiel click");

// })


// }

// document.querySelector(".map").addEventListener('click', function (e) {

// e.stopPropagation()

// })




document.querySelector(".popupCloseButton").addEventListener('click', function () {

document.querySelector('.statewide').classList.remove("vis");
// document.querySelector('.statewideInner').classList.remove("vis");
// console.log("functioning");


})


}

// console.log("CURR PROG");
// console.log(currentProgram);





    // Create a popup, but don't add it to the map yet.
    // var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: true
    // });


// map.on('mouseenter', 'ras2', function(e) {
//         // Change the cursor style as a UI indicator.
//         map.getCanvas().style.cursor = 'pointer';


//         ///////getting from teh JSON



//         var projLoc= e.features[0].properties['loc'];



//         var featProgram = e.features[0].properties.Program;

//         var currentData = ras_ak.filter(d=>d.loc == projLoc && d.Program == featProgram)



// console.log("feet");
// console.log(featProgram);

//         var coordinates = e.features[0].geometry.coordinates.slice();
//         // var des = e.features[0].properties['Web Title'];
//         // var name = e.features[0].properties['Organization Name'];
//         // var award = e.features[0].properties['Award Amount'];

//         var popContent = `<div class="pop"><h3>Recipient: </h3>${projLoc}<br />
// 					<h3>Project Location: </h3>${projLoc}  <br />      				
// 					<h3>Award: </h3>${currentData[0].AwardAmount} 
//         				<br />
//         				<h3>Description: </h3>${projLoc}</div>`


//            var popMultiple = currentData.map(function (el) {

// return `<h4> ${el.OrganizationName}</h4>
//  ${el.WebTitle}
// Award: ${el.AwardAmount}
//          <br />`

//                 })

//                 var popDiv = `<div class="pop">${popMultiple}</div>`



//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         // Populate the popup and set its coordinates
//         // based on the feature found.
//         popup.setLngLat(coordinates)
//             .setHTML(popDiv)
//             .addTo(map);
//     });















// map.on('touchstart', 'ras2', function(e) {
// e.originalEvent.preventDefault(true);
// e.preventDefault(true);

// })










// map.on('touchstart', 'ras2', function(e) {
//         // Change the cursor style as a UI indicator.
//         map.getCanvas().style.cursor = 'pointer';


// console.log("DEFAULTS")
// console.log(map.touchZoomRotate.defaultPrevented)
//         ///////getting from teh JSON
//     // e.originalEvent.preventDefault(true);
//     // e.preventDefault(true);



//         var projLoc= e.features[0].properties['loc'];



//         var featProgram = e.features[0].properties.Program;
//         var currentData;

//         console.log("currentPogrg")
//         console.log(currentProgram)

//    if (currentProgram == "allPrograms")
//             {currentData = ras_ak.filter(d=>d.loc == projLoc)
//       currentData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))

//             }
      
//               else

//          {currentData = ras_ak.filter(d=>d.loc == projLoc && d.Program == featProgram)
//              console.log("current unsorted");
//              console.log(currentData);

//               // currentData.sort((a,b)=>a.OrganizationName-b.OrganizationName)
//               // currentData=  currentData.sort((a,b)=>a.OrganizationName.toUpperCase()-b.OrganizationName.toUpperCase())
   

//       currentData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))

//     console.log("current sorted");
//              console.log(currentData);

//          } 




//         /////this is where the ALL grants is being messed up. 

// // switch(expression) {
// //     case n:
// //         code block
// //         break;
// //     case n:
// //         code block
// //         break;
// //     default:
// //         code block
// // }


// var bannerColor;

// switch (currentProgram) {

//   case "Tier 1":
//   bannerColor = "#4789c8";
//   break;

//   case "Tier 2":
//   bannerColor = "#72cac3";
//   break;

//   case "Sabbatical":
//   bannerColor="#a5c6be";
//   break;

//     case "Individual Artist Award":
//   bannerColor="#e09641";
//   break;

// default: 
//         bannerColor="#333333";



// }


// console.log("the color");
// console.log(bannerColor);

// console.log("moutOVER features");
// console.log(e.features);

//         var coordinates = e.features[0].geometry.coordinates.slice();
//         // var des = e.features[0].properties['Web Title'];
//         // var name = e.features[0].properties['Organization Name'];
//         // var award = e.features[0].properties['Award Amount'];





//         var popContent = `<div style="background-color:${bannerColor}" class="popUpLine"></div><div class="pop"><h3>Recipient: </h3>${projLoc.substr(-2,20)}<br />
//           <h3>Project Location: </h3>${projLoc.substr(-2,20)}  <br />             
//           <h3>Award: </h3>${currentData[0].AwardAmount} 
//                 <br />
//                 <h3>Description: </h3>${projLoc}</div>`


//            var popMultiple = currentData.map(function (el) {

// return `<h4> ${el.OrganizationName+'\u00A0\u00A0'}-${'\u00A0\u00A0'+el.AwardAmount}</h4>
//  <p class="indent">${el.WebTitle}</p>
//          <br />`

//                 })

//                 var popDiv = `<h4 class="loc" style="background-color:${bannerColor}">${projLoc.substr(0,projLoc.length-4)}</h4><div class="pop">${popMultiple.join('')}</div>`


// // <div style="background-color:${bannerColor}" class="popUpLine"></div>
//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }






//         // Populate the popup and set its coordinates
//         // based on the feature found.
//         popup.setLngLat(coordinates)
//             .setHTML(popDiv)
//             .addTo(map);


// // function rv() {

// // if (e.features[0].properties.loc != "Anchorage, AK")
// // {
// //   popup.remove();
// // }

// // }

// // setTimeout(rv, 1000)

//     });






























//////////###########trying click//////////






map.on('click', 'ras2', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';


console.log("DEFAULTS")
console.log(map.touchZoomRotate.defaultPrevented)
        ///////getting from teh JSON
    // e.originalEvent.preventDefault(true);
    // e.preventDefault(true);



        var projLoc= e.features[0].properties['loc'];



        var featProgram = e.features[0].properties.Program;
        var currentData;

        console.log("currentPogrg")
        console.log(currentProgram)

   if (currentProgram == "allPrograms")
            {currentData = ras_ak.filter(d=>d.loc == projLoc)
      currentData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))

            }
      
              else

         {currentData = ras_ak.filter(d=>d.loc == projLoc && d.Program == featProgram)
             console.log("current unsorted");
             console.log(currentData);

              // currentData.sort((a,b)=>a.OrganizationName-b.OrganizationName)
              // currentData=  currentData.sort((a,b)=>a.OrganizationName.toUpperCase()-b.OrganizationName.toUpperCase())
   

      currentData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))

    console.log("current sorted");
             console.log(currentData);

         } 




        /////this is where the ALL grants is being messed up. 

// switch(expression) {
//     case n:
//         code block
//         break;
//     case n:
//         code block
//         break;
//     default:
//         code block
// }


var bannerColor;

switch (currentProgram) {

  case "Small Grants":
  bannerColor = "#4789c8";
  break;

  case "Large Grants":
  bannerColor = "#72cac3";
  break;

  case "Sabbatical":
  bannerColor="#a5c6be";
  break;

    case "Individual Artist Award":
  bannerColor="#e09641";
  break;

default: 
        bannerColor="#333333";



}


console.log("the color");
console.log(bannerColor);

console.log("moutOVER features");
console.log(e.features);

        var coordinates = e.features[0].geometry.coordinates.slice();
        // var des = e.features[0].properties['Web Title'];
        // var name = e.features[0].properties['Organization Name'];
        // var award = e.features[0].properties['Award Amount'];










        var popContent = `<div style="background-color:${bannerColor}" class="popUpLine"></div><div class="pop"><h3>Recipient: </h3>${projLoc.substr(-2,20)}<br />
          <h3>Project Location: </h3>${projLoc.substr(-2,20)}  <br />             
          <h3>Award: </h3>${currentData[0].AwardAmount} 
                <br />
                <h3>Description: </h3>${projLoc}</div>`



                
           var popMultiple = currentData.map(function (el) {

return `<h4> ${el.OrganizationName+'\u00A0\u00A0'}- <span class="money">$${'\u00A0\u00A0'+el.AwardAmount.toLocaleString()}</span></h4>
 <p class="indent">${el.Description}</p>
         <br />`

                })

                var popDiv = `<h4 id="loc" style="background-color:${bannerColor}">${projLoc.substr(0,projLoc.length-4)}</h4><div class="pop">${popMultiple.join('')}</div>`

// <div style="background-color:${bannerColor}" class="popUpLine"></div>
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }






        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(popDiv)
            .addTo(map);


// function rv() {

// if (e.features[0].properties.loc != "Anchorage, AK")
// {
//   popup.remove();
// }

// }

// setTimeout(rv, 1000)

    });






























/////////////######### clickend







    map.on('mouseleave', 'ras2', function() {
        map.getCanvas().style.cursor = '';
        // popup.remove();
    });

  map.on('touchend', 'ras2', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });





//#########mouseover

map.on('mouseenter', 'ras2', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';


        ///////getting from teh JSON

        // popup.remove();


    // var popup = new mapboxgl.Popup({
    //     closeButton: false,
    //     closeOnClick: true
    // });


//imortant
        var projLoc= e.features[0].properties['ProjectLocationMatch'];



        var featProgram = e.features[0].properties.Program;
        var currentData;

   


var bannerColor;

switch (currentProgram) {

  case "Small Grants":
  bannerColor = "#4789c8";
  break;

  case "Large Grants":
  bannerColor = "#72cac3";
  break;

  case "Sabbatical":
  bannerColor="#a5c6be";
  break;

    case "Individual Artist Award":
  bannerColor="#e09641";
  break;

default: 
        bannerColor="#333333";



}







        if (currentProgram == "allPrograms")
            {currentData = ras_ak.filter(d=>d.ProjectLocationMatch == projLoc)
      currentData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))

            }
      
              else

         {currentData = ras_ak.filter(d=>d.ProjectLocationMatch == projLoc && d.Program == featProgram)
             console.log("current unsorted");
             console.log(currentData);

              // currentData.sort((a,b)=>a.OrganizationName-b.OrganizationName)
              // currentData=  currentData.sort((a,b)=>a.OrganizationName.toUpperCase()-b.OrganizationName.toUpperCase())
   

      currentData.sort((a, b) => a.OrganizationName.localeCompare(b.OrganizationName))

    // console.log("current sorted");
    //          console.log(currentData);

         } 


        /////this is where the ALL grants is being messed up. 

// switch(expression) {
//     case n:
//         code block
//         break;
//     case n:
//         code block
//         break;
//     default:
//         code block
// }



// console.log("the color");
// console.log(bannerColor);

// console.log("moutOVER features");
// console.log(e.features);

        var coordinates = e.features[0].geometry.coordinates.slice();
        // var des = e.features[0].properties['Web Title'];
        // var name = e.features[0].properties['Organization Name'];
        // var award = e.features[0].properties['Award Amount'];





        // var popContent = `<div style="background-color:${bannerColor}" class="popUpLine"></div><div class="pop"><h3>Recipient: </h3>${projLoc.substr(-2,20)}<br />
        //   <h3>Project Location: </h3>${projLoc.substr(-2,20)}  <br /> `            
      

           var popMultiple = currentData.map(function (el) {

return `<h4> ${el.OrganizationName+'\u00A0\u00A0'}- <span class="money">$${el.AwardAmount.toLocaleString()}</span></h4>
 <p class="indent">${el.Description}</p>
         <br />`

                })

                var popDiv = `<h4 id="loc" style="background-color:${bannerColor}">${projLoc.substr(0,projLoc.length-0)}</h4><div class="pop">${popMultiple.join('')}</div>`


// <div style="background-color:${bannerColor}" class="popUpLine"></div>
        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }






        // Populate the popup and set its coordinates
        // based on the feature found.
  //         function set () {


        function set () {
        popup.setLngLat(coordinates)
            .setHTML(popDiv)
            .addTo(map);

}

setTimeout(set, 18)

// currentData = null;

// popup.remove();

// e.stopPropagation();


// function rv() {

// if (e.features[0].properties.loc != "Anchorage, AK")
// {
//   popup.remove();
// }

// }

// // setTimeout(rv, 4100)

    });



//     map.on('mouseleave', 'ras2', function(f) {
//         map.getCanvas().style.cursor = '';
//             // var features = map.queryRenderedFeatures(e.point);

//         console.log('mouseLEAVE');
//         console.log(f.features);
//         console.log(f.target);
//         console.log(f);
//     //    if (f.features[0].properties.loc != "Anchorage, AK") 

//     //     {
//     //       popup.remove()
//     //       console.log("it aint' anchorage");
//     //     }  

//     // else console.log("it's anc");

//     // popup.remove();

// popup.remove();

//     });





//////######new click:

// map.touchZoomRotate.enable();
// map.dragPan.enable();
// console.log('DRAGGIN?')
// console.log(map.dragPan.isEnabled())
// console.log(map.touchZoomRotate.isEnabled())


// map.on('mousedown', 'ras2', function(e) {
//         // Change the cursor style as a UI indicator.
//         map.getCanvas().style.cursor = 'pointer';

//     // e.originalEvent.preventDefault(true);
//     // e.preventDefault(true);


//         ///////getting from teh JSON



//         var projLoc= e.features[0].properties['loc'];



//         var featProgram = e.features[0].properties.Program;

//         var currentData = ras_ak.filter(d=>d.loc == projLoc && d.Program == featProgram)



// console.log("CLEICK FESTURE");
// console.log(e.features);

//         var coordinates = e.features[0].geometry.coordinates.slice();
//         // var des = e.features[0].properties['Web Title'];
//         // var name = e.features[0].properties['Organization Name'];
//         // var award = e.features[0].properties['Award Amount'];

//         var popContent = `<div class="pop"><h3>Recipient: </h3>${projLoc}<br />
//           <h3>Project Location: </h3>${projLoc}  <br />             
//           <h3>Award: </h3>${currentData[0].AwardAmount} 
//                 <br />
//                 <h3>Description: </h3>${projLoc}</div>`


//            var popMultiple = currentData.map(function (el) {

// return `<h4> ${el.OrganizationName+'\u00A0\u00A0'}-${'\u00A0\u00A0'+el.AwardAmount}</h4>
//  <p class="indent">${el.WebTitle}</p>
//          <br />`

//                 })

//                 var popDiv = `<div class="pop">MOUSEDOWN${popMultiple.join('')}</div>`



//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         // Populate the popup and set its coordinates
//         // based on the feature found.


//         function set () {


        
//         popup.setLngLat(coordinates)
//             .setHTML(popDiv)
//             .addTo(map);
// }


// setTimeout(set, 1000)

// function rv() {

// if (e.features[0].properties.loc != "Anchorage, AK")
// {
//   popup.remove();
// }

// }

// // setTimeout(rv, 2000)

    
//     });



    // map.on('mouseleave', 'ras2', function(e) {
    //     map.getCanvas().style.cursor = '';
    //         // var features = map.queryRenderedFeatures(e.point);

    //     // console.log(features);


    // });







////#########end new click




























//###########click test



// //###############MAP 2



// var map2 = new mapboxgl.Map({
//   container: 'map2',
//   // style: 'mapbox://styles/mapbox/light-v9',
//   style: 'mapbox://styles/benmatheson/cjh2yaf301jjm2sru7r1uz7n7',
//   center: [-1, 12],
//   zoom: 4.2,
// //   "transition": {
// //   "duration": 800,
// //   "delay": 0
// // }
// });


// map2.on('load', function() {



// map2.addSource('rasShape', {
//   type: 'geojson',
//   // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
//   data: ak_simple_fake
// });


//   map2.addLayer({
//         "id": "rasAk",
//         "type": "fill",
//       "source": "rasShape",


//     'paint': {

//             "fill-color": "whitesmoke"

//     }


        



//       })



// map2.scrollZoom.disable();

// map2.addSource('ras1', {
//   type: 'geojson',
//   // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
//   data: red_fake
// });

// map2.addSource('cities', {
//   type:'geojson',
//   data: cities_fake


// })


//   map2.addLayer({
//         "id": "ras2",
//         "type": "circle",
//       "source": "ras1",

     

//     'paint': {
//             // make circles larger as the user zooms from z12 to z22
//             'circle-radius': {
//                 // 'base': 20,
//                 'stops': [[12, 7], [22, 20]]
//             },
//             // color circles by ethnicity, using a match expression
//             // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
//             'circle-color': [
//                 'match',
//                 ['get', 'Program'],
//                 'Tier 1', 'rgba(69, 178, 66, .6)',
//                 'Tier 2', 'rgba(178, 66, 69, .5)',
//                 'Individual Artist Award', '#a02ca0',
//                 'Foundation Initiated', '#3bb2d0',
//                 'Sabbatical', 'red',

//                 /* other */ '#ccc'
//             ],

             

//             // 'circle-stroke-color': "darkblue",
//             // 'circle-stroke-width': 1,
//             // 'circle-color': 'rgba(0,0,0,0)'
//         },







//       })








// map2.setFilter('ras2', ['in', 'Program', 'Individual Artist Award', 'Sabbatical']);

//  // ["in", "class", "street_major", "street_minor", "street_limited"]


//  map2.addLayer({
//         "id": "cities1",
//         "type": "symbol",
//       "source": "cities",


//         "layout": {
//             "text-field": "{Community Name}",
//                         "text-offset": [1, 0.5],

//             "text-font": ["Open Sans Bold","Arial Unicode MS Regular"],
//             "text-size": 12,
//             // "text-weight": "bold"
//         },




//     'paint': {
//             // make circles larger as the user zooms from z12 to z22
//             // 'circle-radius': 3,*********
//             // color circles by ethnicity, using a match expression
//             // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
//                     "text-halo-color": "#ffffff",
//                     "text-halo-width": .9,
//                     "text-halo-blur": .4


//             // 'circle-stroke-color': "darkblue",
//             // 'circle-stroke-width': 1,
//             // 'circle-color': 'rgba(0,0,0,0)'
//         }





//       })





//     });






//     // Create a popup, but don't add it to the map yet.
//     var popup = new mapboxgl.Popup({
//         closeButton: false,
//         closeOnClick: false
//     });


// map2.on('mouseenter', 'ras2', function(e) {
//         // Change the cursor style as a UI indicator.
//         map2.getCanvas().style.cursor = 'pointer';

//         var coordinates = e.features[0].geometry.coordinates.slice();
//         var des = e.features[0].properties['Web Title'];
//         var name = e.features[0].properties['Organization Name'];
//         var award = e.features[0].properties['Award Amount'];
//         var projLoc= e.features[0].properties['ProjectLocation'];

//         var popContent = `<div class="pop"><h3>Recipient: </h3>${name}<br />
//           <h3>Project Location: </h3>${projLoc}  <br />             
//           <h3>Award: </h3>${award} 
//                 <br />
//                 <h3>Description: </h3>${des}</div>`


//           var sideContent = `<h3>Recipient: </h3>${name}<br />
//           <h3>Project Location: </h3>${projLoc}  <br />             
//           <h3>Award: </h3><p class="side${award} 
//                 <br />
//                 <h3>Description: </h3>${des}`

//         // Ensure that if the map is zoomed out such that multiple
//         // copies of the feature are visible, the popup appears
//         // over the copy being pointed to.
//         while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
//             coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
//         }

//         // Populate the popup and set its coordinates
//         // based on the feature found.
//         popup.setLngLat(coordinates)
//             .setHTML(popContent)
//             .addTo(map2);
//     });

//     map2.on('mouseleave', 'ras2', function() {
//         map2.getCanvas().style.cursor = '';
//         popup.remove();
//     });




// map2.addControl(new mapboxgl.NavigationControl());



/////////### TOUCH



