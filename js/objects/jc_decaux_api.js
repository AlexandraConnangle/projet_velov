var jcDecauxApi = {

    api_stations: {},

    get_infos: function (mapObj, stationsObj) {
        ajaxGet("https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=65adc5c82a525d50ab5ca790bfecfde20a9c284c", function (reponse) {
            // Convertion du tableau JSON en tableau d'objet contenant les stations
            this.api_stations = JSON.parse(reponse);

            //Boucle qui place les markers pour chaque station
            this.api_stations.forEach(function (infosStation) {
                mapObj.create_marker(infosStation, stationsObj);
            });
            //Fonction qui regroupe les markers
            mapObj.clustering_markers();
        });
    }
};
