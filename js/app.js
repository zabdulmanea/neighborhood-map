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
    
    
        };
    
        /* This function create the markers and display them on the map. */
        this.displayMarkers = function () {
    
            // Create the Map Markers 
            for (var i = 0; i < Model.markers.length; i++) {
                // Get the position from the location array.
                this.position = Model.markers[i].location;
                this.title = Model.markers[i].title;
                this.type = Model.markers[i].type;
                // Create a marker per location, and put into markers array.
                this.marker = new google.maps.Marker({
                    position: this.position,
                    title: this.title,
                    type: this.type,
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
