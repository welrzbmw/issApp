//API url that is being used in the fetch().
let api_url = 'https://api.wheretheiss.at/v1/satellites/25544';
var iSSMarker = null;
var testMap;


//Setting up the Map
var mymap = L.map('mapid').setView([0, 0], 1.5);
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
maxZoom: 18,
id: 'mapbox/streets-v11',
accessToken: 'pk.eyJ1Ijoid2VscnpibXciLCJhIjoiY2s2Nno3NWN3MWRoZDNrcWpwdWh6MXV6MiJ9.aUgNoi4QFynI-DGr1vP2nA'}).addTo(mymap);





async function getISS(){
    

    // Fetching information from the API
    const response = await fetch(api_url);
    const dataISS = await response.json();
    //Printing the JSON to the console to read the information.
    console.log(dataISS);

    //Getting the Lat,Long and Velocity from the JSON and defining it.
    const {longitude, latitude, velocity} = dataISS;
    
    

    // Adding information to the site by ID
    document.getElementById('lat').textContent = latitude;
    document.getElementById('lon').textContent = longitude;
    document.getElementById('vel').textContent = velocity;   
    //Adding Marker to the map 
    if(iSSMarker)
    {
        iSSMarker.setLatLng([latitude,longitude]);
        
    }
    else
    {
        iSSMarker = L.marker([latitude,longitude]).addTo(mymap);
        
    }
   
    

}
//Calling the function
getISS();

//Refreshing or updating the getISS Function every 1 second(for the rate limit restriction)
setInterval(getISS, 1000);