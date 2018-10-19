//Build Cotroller object for logic controller
var mainController = {


    //Inititialization Function - App
    init: function () {
        console.log("running init function");
        //build left nav bar content
        uiController.buildLeftNavBar(data.countries, data.diseaseGroups);
        //add listeners
        $(uiController.selectors.leftNav + " li").on("click", mainController.onLeftNavClick);


        //This is for testing
        var usaRespiratory = mainController.fetchHealthData("USA", "U104");
        var chinaRespiratory = mainController.fetchHealthData("CHN", "U104");
        console.log(usaRespiratory, chinaRespiratory);
    },

    //events for button/nav clicks
    onLeftNavClick: function () {

        //call the fetch health data function
        mainController.fetchHealthData();

        //pass data to uiController to populate map
    },

    //Functions for retreiving data from WHO 
    fetchHealthData: function (country, diseaseCauseSubGroup) {

        //URL for AJAX request
        var queryUrl = "https://crossorigin.me/http://apps.who.int/gho/athena/data/GHO/SDG_SH_DTH_RNCOM?profile=simple&format=json&filter=SEX:BTSX;COUNTRY:" + country + ";YEAR:2016;"

        //create simplified object and store in data

        $.ajax({
            url: queryUrl,
            method: "GET"
        }).then(function (response) {
            console.log(response);
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
    populateMap: function () {
        //use health data and leaflet API to create heat map
    },



    //Use the API data to build the left navigation bar 
    buildLeftNavBar: function (countries, diseases) {
        //for loop to loop through countries

        countries.forEach(function (country) {
            var topLevNavItem = $("<li>")
                .addClass("nav-item dropdown v-flex-align-right")
                .text(country.name)
                .data("code", country.code)
                .appendTo(uiController.selectors.leftNav);
            // // add the missing things for dropdown
            // $("<a>")
            //     .attr({
            //         class: "dropdown-toggle",
            //         role: "button",
            //         "data-toggle": "dropdown",
            //         "aria-haspopup": "true",
            //         "aria-expanded": "false",
            //         "h-ref": "#"
            //     })
            //     .appendTo(topLevNavItem);

            // var dropdownContainer = $("<ul>")
            //     .attr({
            //         class: "dropdown-menu", "aria-labelledby": "navbarDropdownMenuLink"
            //     })
            //    .appendTo(topLevNavItem);

            diseases.forEach(function (disease) {
                $("<li>")
                    .attr({
                        class: "d-none",
                        "h-ref": "#",
                        "data-code": disease.code
                    })
                    .text(disease.name)
                    //.appendTo(dropdownContainer);
                    .appendTo(topLevNavItem);
            });
        });
    },
};

//Build Controller object for data
var data = {


    //Build JSON array of Country objects 
    //Possibly need array of coordinates for map
    countries: [
        {
            name: "Brazil",
            code: "BRA",
            population: 205823665
        },
        {
            name: "China",
            code: "CHN",
            population: 1373541278
        },
        {
            name: "India",
            code: "IND",
            population: 1266883598
        },
        {
            name: "Indonesia",
            code: "IDN",
            population: 258316051
        },
        {
            name: "United States",
            code: "USA",
            population: 323995528
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