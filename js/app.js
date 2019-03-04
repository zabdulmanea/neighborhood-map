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
