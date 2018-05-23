var webStorage = {
    datas: {},

    //Fonction qui sauvegarde le nom de la station et le nombre de vélo restant après la reservation
    save_datas_station: function (reservationObj, canvasObj ) {
        this.datas.stationName = reservationObj.station_name;
        this.datas.available_bikes = reservationObj.available_bikes;
        this.datas.signature = canvasObj.clickDrag;
    },

    //Fonction qui sauvegarde le compteur à chaque décrémentation
    save_datas_timer: function () {
        this.datas.remaining_time = reservation.remaining_time;
        this.datas.timer_minutes = reservation.minutes;
        this.datas.timer_secondes = reservation.secondes;
    },

    //Fonction sauvegarde la variable datas dans sessionStorage
    web_storage_set_item: function () {
        var setDatas = this.datas;
        sessionStorage.setItem("reservationBike", JSON.stringify(setDatas));
    },

    //Fonction qui récupère la variable datas dans sessionStorage 
    web_storage_get_item: function (reservationObj, stationObj) {
        var getDatas = JSON.parse(sessionStorage['reservationBike']);
        reservationObj.station_name = getDatas.stationName.toString();
        reservationObj.remaining_time = getDatas.remaining_time;
        reservationObj.minutes = getDatas.timer_minutes;
        reservationObj.secondes = getDatas.timer_secondes;
        stationObj.available_bikes = getDatas.available_bikes;
        this.datas = getDatas;
    },

    //Fonction replace les informations sauvegardées dans le bloc de reservation
    restore_reservation: function (stationObj, reservationObj, sessionObj) {
        sessionObj.web_storage_get_item(reservationObj, stationObj);
        reservationObj.bike_reservation(stationObj, sessionObj);
        reservationObj.countdown_reservation(reservationObj.remaining_time, sessionObj);
    },

    //Fonction qui supprime la reservation dans sessionStorage
    clear_web_storage: function () {
        sessionStorage.removeItem("reservationBike");
    }
};
