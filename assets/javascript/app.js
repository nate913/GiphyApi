$(document).ready(function () {
    //Array for searched topics to be added
    var topics = [];

    //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 20 results
    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displaywwe() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=dc6zaTOxFJmzC&limit=20";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var wweDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var wweImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                wweImage.attr("src", staticSrc);
                wweImage.addClass("wweGiphy");
                wweImage.attr("data-state", "still");
                wweImage.attr("data-still", staticSrc);
                wweImage.attr("data-animate", defaultAnimatedSrc);
                wweDiv.append(p);
                wweDiv.append(wweImage);
                $("#gifArea").prepend(wweDiv);

            }
        });
    }

    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
    $("#addWwe").on("click", function (event) {
        event.preventDefault();
        var newWwe = $("#wweInput").val().trim();
        topics.push(newWwe);
        console.log(topics);
        $("#wweInput").val('');
        displayButtons();
    });

    //Function iterates through topics array to display button with array values in "myButtons" section of HTML
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-danger">');
            a.attr("id", "wwe");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    //Click event on button with id of "Wwe" executes displaywwe function
    $(document).on("click", "#wwe", displaywwe);

    //Click event on gifs with class of "wweGiphy" executes pausePlayGifs function
    $(document).on("click", ".wweGiphy", pausePlayGifs);

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});