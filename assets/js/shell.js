//Build the right Statistics Bar
buildRightStatistics: function (countries, diseases) {
    //for loop to loop through countries

    diseases.forEach(function (disease) {
        //add ul in card for statistics (should this be moved out we only need to do it once not for each country?)
        var rightStats = $("<ul>")
            .addClass("list-group list-group-flush")
            .appendTo("#statistics");

        // add Disease
        var rightDisease = $("<li>")
            .addClass("disease-title")
            .text(disease.title)
            .appendTo(rightStats);


        //adding the countries to each disease
        countries.forEach(function (country) {
           var rightCountry =  $("<ul>")
                .addClass("list-group list-group-flush")
                .text(country.title)
                .appendTo(rightDisease);
                
            //add population stats
            $("<li>")
            .addClass("list-group-item")
            .text("Population: " + country.population)
            .appendTo(rightCountry);

            //add Instances
            $("<li>")
            .addClass("list-group-item")
            .text("Instances: " + country.values)
            .appendTo(rightCountry);

            //add Per Capita
            $("<li>")
            .addClass("list-group-item")
            .text("Per Capita: " + ((country.population)/(country.values)))
            .appendTo(rightCountry);
 
        });
    });
},