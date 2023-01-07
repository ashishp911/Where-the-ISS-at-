
    //  Making a tile
const map = L.map('map').setView([0, 0], 2);   
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>';
const tilesURL = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tilesURL, {attribution});
tiles.addTo(map);
// making a marker icon 
const myIcon = L.icon({
    iconUrl: '../Images/International_Space_Station.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], {icon: myIcon}).addTo(map);
const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

let firstTime = true;
async function getcoordinated()
{
    const response = await fetch(api_url);
    const data = await response.json();
    // console.log(data);
    const {latitude, longitude} = data
    marker.setLatLng([latitude, longitude])
    if(firstTime){
        map.setView([latitude, longitude], 2);
        firstTime = false;
    }
    const altitude = data.altitude
    const velocity = data.velocity
    
    document.getElementById('lat').textContent = latitude.toFixed(2);
    document.getElementById('lon').textContent = longitude.toFixed(2);            
    document.getElementById('alt').textContent = altitude.toFixed(2);            
    document.getElementById('velo').textContent = velocity.toFixed(2);            
}
getcoordinated();
// 300000
setInterval(getcoordinated, 5000);