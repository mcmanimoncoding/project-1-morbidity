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

    // Left half of split button click
    onDropDownClick: function (event) {
        console.log("Main Dropdown button clicked (disease group).", event);

        //call the fetch health data function
        // mainController.fetchHealthData();

        //pass data to uiController to populate map
    },

    // drop down menu item click
    onDropDownItemClick: function (event) {
        console.log("Main Dropdown button clicked (disease group).", event);

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
        googleMap: "#googleMap",
        leftNav: "#left-nav"
    },

    //Function for mapping data to Leaflet API
    populateMap: function (countries) {
        var zoomLvl = 1.5;
        // console.log(new google.maps.LatLng(37.782551, -122.445368));
        var mapProp = {
            center: new google.maps.LatLng(20, 20),
            zoom: zoomLvl,
        };
        var map = new google.maps.Map($(this.selectors.googleMap)[0], mapProp);
        var heatmapData = [];
        for (var country in countries) {
            var countryObj = countries[country];
            var marker = new google.maps.Marker({ position: countryObj.coord, map: map, title: countryObj.title });
            heatmapData.push({
                location: new google.maps.LatLng(countryObj.coord.lat, countryObj.coord.lng),
                weight: countryObj.weight
            });
        }
        
        var heatmap = new google.maps.visualization.HeatmapLayer({
            data: heatmapData,
            map: map,
            radius: "300"
        });

        map.addListener('zoom_changed', function () {
            // 3 seconds after the center of the map has changed, pan back to the
            // marker.
            if (zoomLvl !== map.getZoom()) {
                zoomLvl = map.getZoom();
                console.log("Map Zoom Level:", map.getZoom());
                heatmap.set('radius', zoomLvl * 20);
                console.log("Heatmap Radius:", heatmap.get('radius'));
            }
        });
    },

    //Use the API data to build the left navigation bar 
    buildLeftNavBar: function (countries, diseases) {
        //for loop to loop through countries

        diseases.forEach(function (disease) {
            //add dropdown wrapper
            var dropDown = $("<div>")
                .addClass("btn-group dropright")
                .appendTo(uiController.selectors.leftNav);

            // add left side of split button
            $("<button>")
                .attr({
                    "type": "button",
                    "class": "btn btn-info btn-sm",
                    "data-code": disease.code,
                })
                .text(disease.name)
                .on("click", mainController.onDropDownClick)
                .appendTo(dropDown);


            //add the right side of the split button
            var rightButton = $("<button>")
                .attr({
                    "type": "button",
                    "class": "btn btn-sm btn-info dropdown-toggle dropdown-toggle-split",
                    "data-toggle": "dropdown",
                    "aria-haspopup": "true",
                    "aria-expanded": "false"
                })
                .appendTo(dropDown);

            $("<span>")
                .addClass("sr-only")
                .text("Toggle Dropdown")
                .appendTo(rightButton);


            //add the div for flyout
            var dropdownContainer = $("<div>")
                .attr({
                    class: "dropdown-menu dropdown-menu-right text-left",
                    "aria-labelledby": "navbarDropdownMenuLink"
                })
                .on("click", mainController.onDropDownItemClick)
                .appendTo(dropDown);

            //adding the diseases to flyout
            countries.forEach(function (country) {
                $("<a>")
                    .attr({
                        class: "dropdown-item",
                        "h-ref": "#",
                        "data-code": country.code
                    })
                    .text(country.name)
                    .on("click", mainController.onDropDownItemClick)
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
            code: "BRA",
            population: 205823665,
            coord: { lat: -14.235004, lng: -51.92528 },
            language: "Portuguese",
            title: "Brazil",
            weight: 80
        },
        {
            code: "CHN",
            population: 1373541278,
            coord: { lat: 35.86166, lng: 104.195397 },
            language: "Chinese",
            title: "China",
            weight: 80

        },
        {
            code: "IND",
            population: 1266883598,
            coord: { lat: 20.593684, lng: 78.96288 },
            language: "Hindi",
            title: "India",
            weight: 80
        },
        {
            code: "IDN",
            population: 258316051,
            coord: { lat: -0.789275, lng: 113.921327 },
            language: "Indonesian",
            title: "Indonesia",
            weight: 80
        },
        {
            code: "USA",
            population: 323995528,
            coord: { lat: 37.09024, lng: -95.712891 },
            language: "English",
            title: "United States",
            weight: 80
        }
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












