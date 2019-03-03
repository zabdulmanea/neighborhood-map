/* Data Model: Includes a list of my favorite locations in Al-Nuzhah Neighborhood at Jeddah */
var Model = {
    currentMarker: ko.observable(null),
    markers: [
        {
            title: 'Mall of Arabia',
            location: { lat: 21.6324851, lng: 39.1538997 },
            type: 'Shopping Mall'
        },

        {
            title: 'Alam Al Wesam',
            location: { lat: 21.6258524, lng: 39.1600955 },
            type: 'Discount store'
        },

        {
            title: 'Rotana Hall Wedding',
            location: { lat: 21.6291716, lng: 39.1548892 },
            type: 'Wedding Venue'
        },

        {
            title: 'Makkah Restaurant',
            location: { lat: 21.6329237, lng: 39.166206 },
            type: 'Pakistani restaurant'
        },

        {
            title: 'AlBaik',
            location: { lat: 21.6170575, lng: 39.1633406 },
            type: 'Fast food restaurant'
        },
    ]
};