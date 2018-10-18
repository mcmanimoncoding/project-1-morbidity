
var countries = {
    china: [35.86166,	104.195397],
    india: [20.593684,	78.96288],
    unitedStates: [37.09024, -95.712891]
};

for(var key in countries){
    console.log(countries[key]);
    L.marker(countries[key]).addTo(mymap);
}