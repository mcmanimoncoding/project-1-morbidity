//Use the API data to build the left navigation bar 
buildLeftNavBar: function (countries, diseases) {
    //for loop to loop through countries

    countries.forEach(function (country) {
        var topLevNavItem = $("<li>")
            .addClass("nav-item dropdown v-flex-align-right")
            .text(country.name)
            .data("code", country.code)
            .appendTo(uiController.selectors.leftNav);
        // add the missing things for dropdown
        $("<a>")
            .attr({
                class: "dropdown-toggle",
                role: "button",
                "data-toggle": "dropdown",
                "aria-haspopup": "true",
                "aria-expanded": "false",
                "h-ref": "#"
            })
            .appendTo(topLevNavItem);

        var dropdownContainer = $("<ul>")
            .attr({
                class: "dropdown-menu", "aria-labelledby": "navbarDropdownMenuLink"
            })
            .appendTo(topLevNavItem);

        diseases.forEach(function (disease) {
            $("<li>")
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
