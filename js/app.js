/* ======= MODEL ======= */
/* Includes a list of my favorite locations in Al-Nuzhah Neighborhood at Jeddah */
var Model = {
    markers: [
        {
            title: 'Mall of Arabia',
            location: { lat: 21.6324851, lng: 39.1538997 },
        },

        {
            title: 'Jawad Center',
            location: { lat: 21.626197, lng: 39.1599411 },
        },

        {
            title: 'Rotana Hall Wedding',
            location: { lat: 21.6291716, lng: 39.1548892 },
        },

        {
            title: 'Makkah Restaurant',
            location: { lat: 21.6329237, lng: 39.166206 },
        },

        {
            title: 'AlBaik',
            location: { lat: 21.6170575, lng: 39.1633406 },
        }
    ]
};
/* ======= END MODEL ======= */

/* Global Variables */
var map, bounds;
// Create a new blank array for all the listing markers.
var markers = [];

/* ======= VIEWMODEL ======= */
function ViewModel() {
    var self = this;

    // Display the map on the page throu Data View variable
    View.initMap();

    /* This function populates the infowindow when the marker is clicked. We'll only allow
        one infowindow which will open at the marker that is clicked, and populate based
        on that markers position. */
    this.populateInfoWindow = function (marker, infowindow) {
        // Foursquare API Client ID
        clientID = "SGRZN1JBO4JBWNJ0BIAKJDRJLMYXVUP2QK1E35XGELUCMQ5F";
        // Foursquare API Client Secret
        clientSecret = "VIERFXGO2G5A5RLHBFHG3LNWGXCDHKYT5FMYBFDWDUTCBIND";

        var content;

        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            // obtain the API URL using the marker title and 
            // latitude and longtude values for the clicked marker
            var url = 'https://api.foursquare.com/v2/venues/search?v=20180323&ll=' +
                marker.position.lat() + ',' + marker.position.lng() + '&client_id=' + clientID +
                '&client_secret=' + clientSecret + '&query=' + marker.title;

            // fetch data from Foursquare API
            $.getJSON(url).done(function (marker) {
                var response = marker.response.venues[0];

                self.name = response.name;
                self.city = response.location.city || 'City not found';
                self.state = response.location.state || 'State not found';
                self.country = response.location.country || 'Country not found';
                self.type = response.categories[0].name || 'Type not found';

                content = '<p style="text-align: center"><b>' + self.name + '</b></p>' +
                    '<p><b>Address: </b>' + self.city + ', ' + self.state + ', ' + self.country + '</p>' +
                    '<p><b>Type: </b>' + self.type + '</p>';

                // Display Foursquare content on infowindow
                infowindow.setContent('<div>' + content + '</div>');
            }).fail(function () {
                alert(
                    "There is an error occured during fetching data from Foursquare! Please try loading the page."
                );
            });

            infowindow.open(map, marker);
            /* This click event is for closing infowindow with X button 
                to clear marker property when the infowindow is closed.
                and recenter the map to show all markers */
            infowindow.addListener('closeclick', function () {
                infowindow.marker = null;
                map.panTo(bounds.getCenter());
                map.fitBounds(bounds);
            });
        }

    }

    /* This function animates the marker when the marker is clicked.
        Then the function that populates the infowindow of 
        this marker will be called. */
    this.activateMarker = function () {

        // Close any InfoWindow appears on the map
        if (largeInfoWindow) {
            largeInfoWindow.close();
        }
        largeInfoWindow = new google.maps.InfoWindow();

        // Move map viewport to the center of the selected marker.
        map.panTo(this.position);

        // animate the clicked marker
        if (this.getAnimation() !== null) {
            this.setAnimation(null);
        } else {
            this.setAnimation(google.maps.Animation.BOUNCE);
            // Stop the animation of the marker
            setTimeout(this.setAnimation(null), 1000);
        }

        // Populate the marker information
        self.populateInfoWindow(this, largeInfoWindow);


    };

    /* This function create the markers and display them on the map. */
    this.displayMarkers = function () {

        // Create the Map Markers 
        for (var i = 0; i < Model.markers.length; i++) {
            // Get the position from the location array.
            this.position = Model.markers[i].location;
            this.title = Model.markers[i].title;
            // Create a marker per location, and put into markers array.
            this.marker = new google.maps.Marker({
                position: this.position,
                title: this.title,
                animation: google.maps.Animation.DROP,
            });
            // Push the marker to our array of markers.
            markers.push(this.marker);
            // Create an onclick event to animate the marker and open an infowindow 
            this.marker.addListener('click', self.activateMarker);
        };

        // Extend the boundaries of the map for each marker and display the marker
        bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(map);
            bounds.extend(markers[i].position);
        }

        //map.fitBounds(bounds);
        map.setCenter(bounds.getCenter());
    };

    this.displayMarkers();

    /* knockout observes the search text input */
    this.searchInput = ko.observable("");

    /* knockout filters locations list based on the search input */
    this.locationsList = ko.computed(function () {
        var filteredList = [];
        // go through all locations to filter the list
        markers.forEach(function (location) {
            // find any matches between the location title and the search input 
            // return true if there is any
            var isLocationSearch = location.title.toUpperCase().includes(self.searchInput().toUpperCase());

            if (isLocationSearch) {
                // push the location into the filtered list
                filteredList.push(location);
                // Show the location marker on the map
                location.setMap(map);
            } else {
                // Hide the location marker from the map
                location.setMap(null);
            }
            // Close any InfoWindow appears on the map
            if (largeInfoWindow) {
                largeInfoWindow.close();
            }
            largeInfoWindow = new google.maps.InfoWindow();

            /* Another way to clear markers*/
            // if true: Set the location marker visible on the map
            // if false: Hide the location marker from the map
            //location.setVisible(markerVisibility);

        });
        return filteredList;
    }, this);

};
/* ======= END VIEWMODEL ======= */

/* ======= View ======= */
var View = {
    /* Display an initial map */
    initMap: function () {
        // Constructor creates a new map
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 21.6241391, lng: 39.1606164 },
            zoom: 15,
            styles: retroStyle,
            mapTypeControl: false
        });
        largeInfoWindow = new google.maps.InfoWindow();
    }
};
/* ======= END View ======= */

/* ======= MAP ERROR ALERT ======= */
function googleMapError() {
    alert('Error while loading Google maps. Please refresh the page and try again!');
}
/* ======= END MAP ERROR ALERT ======= */

/* ======= MAIN ======= */
ko.applyBindings(new ViewModel());
