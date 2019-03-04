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



/* ======= MAIN ======= */
ko.applyBindings(new ViewModel());
