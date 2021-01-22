

mapboxgl.accessToken ="pk.eyJ1IjoiY2hvd2Rlc3dhcmFyYW8iLCJhIjoiY2trNmQ1Z3AzMDJ0NzJ1cDV3aWpnb3M3aiJ9.bVsAd0HA5a7aJJMFbD5NAQ";
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/streets-v11',
center:[12.550343, 55.665957],
zoom: 8
});
var marker = new mapboxgl.Marker()
.setLngLat([12.550343, 55.665957])
.addTo(map);