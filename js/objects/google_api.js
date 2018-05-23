var googleApi = {

    markers: [],
    marker_cluster: {},

    //Fonction qui initialise la map
    init_map: function () {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: { //center Lyon location
                lat: 45.764043,
                lng: 4.835658999999964
            }
        });
        this.map_click_event();
    },
    
    //Fonction Evènement click sur la map
    map_click_event: function(){
        google.maps.event.addListener(map, "click", function (e) {
            //fait disparaitre les panneaux d'infos et de reservation.
            document.getElementById("panneau-container").style.display = "none";
            document.getElementById("reservation-container").style.display = "none";
        });
    },
    
    //Fonction qui crée un marqueur
    create_marker: function (infosStation, stationObject) {
        var marker = new google.maps.Marker({
            position: {
                lat: infosStation.position.lat,
                lng: infosStation.position.lng
            },
            map: map,
            title: infosStation.name
        });
        
        //Evènements liés au marqueur en cours de création : Trasnfert des infos dans le panneau
        google.maps.event.addListener(marker, "click", function (e) {
            stationObject.complete_station_selected(infosStation);
            stationObject.station_selected_display();
        });
        //Ajoute le nouveau marqueur au tableau des marqueurs pour le clustering
        this.markers.push(marker);
    },

    //Fonction qui regroupe les marqueurs
    clustering_markers: function () {
        marker_cluster = new MarkerClusterer(map, this.markers, {
            imagePath: 'http://velov.alexandra-connangle.net/images/markerclusterer/m'
        });
    }
}
