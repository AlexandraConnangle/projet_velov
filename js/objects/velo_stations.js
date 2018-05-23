var veloStation = {

    number: {},
    name: {},
    address: {},
    latitude: {},
    longitude: {},
    banking: {},
    bonus: {},
    status: {},
    contract_name: "Lyon",
    bike_stands: {},
    available_bike_stands: {},
    available_bikes: {},
    last_update: {},

    //Fonction qui transfert les informations de la station selectionnée dans l'objet veloStation
    complete_station_selected: function (infosStation) {
        this.number                     = infosStation.number.toString();
        this.name                       = infosStation.name.toString();
        this.address                    = infosStation.address.toString();
        this.latitude                   = infosStation.position.lat;
        this.longitude                  = infosStation.position.lng;
        this.bike_stands                = Number(infosStation.bike_stands);
        this.available_bike_stands      = Number(infosStation.available_bike_stands);
        this.available_bikes            = Number(infosStation.available_bikes);
        this.last_update                = infosStation.last_update;
        
        this.infos_stations_fr(infosStation);
    },
    
    //Fonction qui traduit le texte en francais avant de l'ajouter dans l'objet veloStation
    infos_stations_fr:function(infosStation){
        if (infosStation.status === "OPEN") {
            this.status = "Ouvert";
        } else {
            this.status = "Fermé";
        };
        if (infosStation.banking === true) {
            this.banking = "Oui";
        } else {
            this.banking = "Non";
        };
        if (infosStation.bonus === true) {
            this.bonus = "Oui";
        } else {
            this.bonus = "Non";
        };
    },

    //Fonction qui affiche le panneau et insert les informations de veloStation
    station_selected_display: function () {
        document.getElementById("panneau-container").style.display = "block";
        document.getElementById("alert-bike").innerHTML ="";
        document.getElementById("panneau").innerHTML = "\
                <h3>" + this.name + "</h3>\
                <span class=\"title-info\">Numéro de la station :</span><span> " + this.number + "</span><br/>\
                <span class=\"title-info\">Adresse :</span><span> " + this.address + "</span><br/>\
                <span class=\"title-info\">Etat actuel :</span><span> " + this.status + "</span><br/>\
                <span class=\"title-info\">Vélo(s) disponible(s):</span><span id=\"available-bikes\"> " + this.available_bikes + "</span><br/>\
                <span class=\"title-info\">Emplacements total:</span><span> " + this.bike_stands + "</span><br/>\
                <span class=\"title-info\">Emplacement(s) disponible(s):</span><span> " + this.available_bike_stands + "</span><br/>\
                <span class=\"title-info\">Règlement par CB :</span><span> " + this.banking + "</span><br/>\
                <span class=\"title-info\">Bonus :</span><span> " + this.bonus + "</span><br/>";
    }
};
