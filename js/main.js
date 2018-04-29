mapboxgl.accessToken = 'pk.eyJ1IjoiYmVubWF0aGVzb24iLCJhIjoiY2lmZDhyZXVxNTI5eHNtbHgyOTYwbHJtMyJ9.Ch8JQXvunpUrv6tGpeJMCA'

var map = new mapboxgl.Map({
  container: 'map1',
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-156, 64.8],
  zoom: 3,
//   "transition": {
//   "duration": 800,
//   "delay": 0
// }
});

map.on('load', function() {



map.addSource('ras1', {
  type: 'geojson',
  // data: 'https://rawgit.com/benmatheson/2011_test/master/ras_ak_red.geojson'
  data: './data/ras_ak_red.geojson'
});


  map.addLayer({
        "id": "ras2",
        "type": "circle",
   		"source": "ras1",

		'paint': {
            // make circles larger as the user zooms from z12 to z22
            'circle-radius': {
                'base': 8,
                'stops': [[12, 4], [22, 8]]
            },
            // color circles by ethnicity, using a match expression
            // https://www.mapbox.com/mapbox-gl-js/style-spec/#expressions-match
            'circle-color': [
                'match',
                ['get', 'Program'],
                'Tier 1', '#1f78b4',
                'Tier 2', '#b2df8a',
                'Individual Artist Award', '#33a02c',
                'Foundation Initiated', '#3bb2d0',
                /* other */ '#ccc'
            ]
        }



   		})
      //       // "icon-image": "{icon}-11",
      //       // "text-field": "{title}",
      //       "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
      //       "text-offset": [0, 0.6],
      //       "text-anchor": "top"
      //   }
	






})



    // Create a popup, but don't add it to the map yet.
    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });


map.on('mouseenter', 'ras2', function(e) {
        // Change the cursor style as a UI indicator.
        map.getCanvas().style.cursor = 'pointer';

        var coordinates = e.features[0].geometry.coordinates.slice();
        var des = e.features[0].properties['Web Title'];
        var name = e.features[0].properties['Organization Name'];
        var award = e.features[0].properties['Award Amount'];
        var projLoc= e.features[0].properties['ProjectLocation'];

        var popContent = `<div class="pop"><h3>Recipient: </h3>${name}<br />
					<h3>Project Location: </h3>${projLoc}  <br />      				
					<h3>Award: </h3>${award} 
        				<br />
        				<h3>Description: </h3>${des}</div>`

        // Ensure that if the map is zoomed out such that multiple
        // copies of the feature are visible, the popup appears
        // over the copy being pointed to.
        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates)
            .setHTML(popContent)
            .addTo(map);
    });

    map.on('mouseleave', 'ras2', function() {
        map.getCanvas().style.cursor = '';
        popup.remove();
    });





