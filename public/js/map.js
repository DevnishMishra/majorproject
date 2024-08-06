
  
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: 'mapbox://styles/mapbox/satellite-streets-v12', // style URL
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 13 // starting zoom
    });
    
    const marker=new mapboxgl.Marker({color:"red"})
    .setLngLat(listing.geometry.coordinates)
   
    .setPopup(new mapboxgl.Popup({offset:25})
       .setHTML(`<h5 style="color:red;;"><b>${listing.title}<b></h5><br/><h8>Exact location will be available after booking!</h8>`))
    .addTo(map)