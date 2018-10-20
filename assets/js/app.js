//Build Cotroller object for logic controller
var mainController = {


    //Inititialization Function - App
    init: function () {
        console.log("running init function");
        //build left nav bar content
        uiController.buildLeftNavBar(data.countries, data.diseaseGroups);
        uiController.populateMap(data.countries, data.diseaseGroups);

    },

    //events for button/nav clicks
    onDropdownClick: function (event) {
        console.log(this);
        console.log(event);
        //call the fetch health data function
        // mainController.fetchHealthData();

        //pass data to uiController to populate map
    },


    //Functions for retreiving data from WHO 
    fetchHealthData: function (country, diseaseCauseSubGroup, callback) {

        //URL for AJAX request
        var queryUrl = "https://cors-anywhere.herokuapp.com/http://apps.who.int/gho/athena/data/GHO/SDG_SH_DTH_RNCOM?profile=simple&format=json&filter=SEX:BTSX;COUNTRY:" + country + ";YEAR:2016;"

        //create simplified object and store in data
        $.ajax({
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            callback(response);
        });
    },
};


//Build Controller object for UI
var uiController = {

    //Add an object to store the selectors
    selectors: {
        leftNav: "#left-nav"
    },

    //Function for mapping data to Leaflet API
    populateMap: function (countries) {
        var zoomLvl = 10;

        // console.log(new google.maps.LatLng(37.782551, -122.445368));
        var mapProp = {
            center: new google.maps.LatLng(37.782551, -122.445368),
            zoom: zoomLvl,
        };
        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

        for (var country in countries) {
            var marker = new google.maps.Marker({ position: countries[country].coord, map: map, title: countries[country].title });
        }

        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: [
                {
                    location: new google.maps.LatLng(37.782551, -122.445368),
                    weight: 0.5
                },
                {
                    location: new google.maps.LatLng(37.782551, -122.445368),
                    weight: 0.5
                }
            ],
            map: map,
            radius: "50"
        });

        map.addListener('zoom_changed', function () {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            if (zoomLvl !== map.getZoom()) {
                zoomLvl = map.getZoom();
                console.log("Map Zoom Level:", map.getZoom());
                heatmap.set('radius', zoomLvl * 2.5);
                console.log("Heatmap Radius:", heatmap.get('radius'));
            }

        });
    },

    //Use the API data to build the left navigation bar 
    buildLeftNavBar: function (countries, diseases) {
        //for loop to loop through countries

        countries.forEach(function (country) {
            //add dropdown wrapper
            var dropDown = $("<div>")
                .addClass("dropdown v-flex-align-right")
                .appendTo(uiController.selectors.leftNav);
            //add the button
            $("<button>")
                .attr({
                    class: "btn btn-info dropdown-toggle",
                    type: "button",
                    id: country.name.toLowerCase() + "-menu-button",
                    "data-toggle": "dropdown",
                    "data-code": country.code,
                    "aria-haspopup": "true",
                    "aria-expanded": "false"
                })
                .text(country.name)
                .on("click", mainController.onDropdownClick)
                .appendTo(dropDown);

            //add the div for flyout
            var dropdownContainer = $("<div>")
                .attr({
                    class: "dropdown-menu", "aria-labelledby": "navbarDropdownMenuLink"
                })
                .appendTo(dropDown);

            //adding the diseases to flyout
            diseases.forEach(function (disease) {
                $("<a>")
                    .attr({
                        class: "dropdown-item",
                        "h-ref": "#",
                        "data-code": disease.code
                    })
                    .text(disease.name)
                    .appendTo(dropdownContainer);
            });
        });
    },
};

//Build Controller object for data
var data = {

    //Build JSON array of Country objects 
    // countries geographical locations 
    // china            35.86166	104.195397	China
    // india            20.593684	78.96288	India
    // united states    37.09024	-95.712891	United States
    // indonesia  	    -0.789275	113.921327	Indonesia
    // brazil 	       -14.235004	-51.92528	Brazil
    countries: [
        {
            name: "China",
            code: "CHN",
            population: 1373541278,
            coord: { lat: 35.86166, lng: 104.195397 },
            language: "Chinese",
            title: "hey we are china"

        },
        {
            name: "India",
            code: "IND",
            population: 1266883598,
            coord: { lat: 20.593684, lng: 78.96288 },
            language: "Chinese",
            title: "india"
        },
        {
            name: "United States",
            code: "USA",
            population: 323995528,
            coord: { lat: 37.09024, lng: -95.712891 },
            language: "Chinese",
            title: "US"
        },
        {
            name: "Brazil",
            code: "BRA",
            population: 205823665,
            coord: { lat: -14.235004, lng: -51.92528 },
            language: "Chinese",
            title: "brazil"
        },
        {
            name: "Indonesia",
            code: "IDN",
            population: 258316051,
            coord: { lat: -0.789275, lng: 113.921327 },
            language: "Chinese",
            title: "indonesia"
        },
    ],

    //Build JSON array of Disease Cause Groups/SubGroups
    diseaseGroups: [
        {
            name: "Cardiovascular Disease",
            code: "U104",
            value: 0
        },
        {
            name: "Diabetes Melitus",
            code: "U079",
            value: 0
        },
        {
            name: "Malignant Neoplasms",
            code: "U060",
            value: 0
        },
        {
            name: "Respiratory Diseases",
            code: "U148",
            value: 0
        }
    ],



};

// add jquery listener for document ready
$(document).ready(mainController.init);












