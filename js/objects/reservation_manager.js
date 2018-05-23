var reservationManager = {

    station_name: {},
    available_bikes: {},
    remaining_time: {},
    minutes: "20",
    secondes: "00",

    countdown_reservation: function (count, sessionObj) {
        var thisReservation = this;

        //Si le compteur est différent de 0
        if (count > 0) {
            // Calcul des minutes
            var min = Math.floor(count / 60);
            // Calcul des secondes à soustraire du compteur total
            var soustractMinutes = 60 * min;
            //Calcul des secondes restantes
            var sec = count - soustractMinutes;
            //décrémentation de 1 au compteur pour avoir le temps restant à chaque appel de la fonction
            this.remaining_time = count - 1;

            //On rajoute un 0 si les minutes sont inférieures à 10
            if (min < 10) {
                this.minutes = "0" + min;
            } else {
                this.minutes = min;
            };
            //On rajoute un 0 si les secondes sont inférieures à 10
            if (sec < 10) {
                this.secondes = "0" + sec;
            } else {
                this.secondes = sec;
            };

            //sauvegarde du timer dans la session
            sessionObj.save_datas_timer();
            sessionObj.web_storage_set_item();
            // Remplacement des minutes et des secondes dans le DOM
            document.getElementById("timer-min").innerHTML = sessionObj.datas.timer_minutes;
            document.getElementById("timer-sec").innerHTML = sessionObj.datas.timer_secondes;
            document.getElementById("name-station").innerHTML = sessionObj.datas.stationName;

            //On rappelle la fonction toute les secondes
            setTimeout(function () {
                thisReservation.countdown_reservation(thisReservation.remaining_time, sessionObj);
            }, 1000);

            //Sinon si le compteur = 0
        } else {
            //Affiche un message qui indique que le délais est écoulé
            document.getElementById("confirmation").innerHTML = "<p>Le délais de réservation est écoulé, merci de renouveller votre demande...</p>";
            // Efface les données de la session
            sessionObj.clear_web_storage();
            //Cache le bloc de reservation après 3 secondes
            setTimeout(function () {
                document.getElementById("reservation-confirmed").style.visibility = "hidden";
            }, 3000);
        };
    },

    check_reservation: function (stationObj) {
        if (stationObj.available_bikes === 0) {
            //Affiche un message d'alert si le nombre de vélo est = 0
            document.getElementById("alert-bike").innerHTML = "Il n'y a plus de vélo disponible dans la station selectionnée...";

        } else {
            //Affiche la pré-reservation si il y a des vélos disponibles
            document.getElementById("reservation-container").style.display = "flex";
            document.getElementById("reservation").innerHTML = " <p>Reserver 1 vélo à la station " + stationObj.name + "</p>";
        }
    },

    //Fonction de validation de reservation
    bike_reservation: function (stationObj, sessionObj) {
        this.station_name = stationObj.name.toString();

        //Simulation de soustraction d'un velo à la station affichée.
        this.available_bikes = stationObj.available_bikes - 1;
        if (document.getElementById("available-bikes") !== null) {
            document.getElementById("available-bikes").innerHTML = " " + this.available_bikes;
        };

        //Affiche la confirmation de reservation et insert le contenu
        document.getElementById("reservation-confirmed").style.visibility = "visible";
        document.getElementById("confirmation").innerHTML = " <p><i class=\"fas fa-bicycle\"></i><br/> 1 Vélo réservé à la station <span id=\"name-station\"> " + sessionObj.datas.stationName + "</span> pour <span id=\"timer-min\"></span> min <span id=\"timer-sec\"></span> sec.</p>";
    },

    //Fonction qui met en place les écouteurs d'évèvenement sur les boutons
    buttons_event: function (stationObj, canvasObj, sessionObj) {
        var thisReservation = this;
        //compteur 20min = 1200sec
        var countdown = 1200; 

        //Affiche le panneau de pré-reservation
        $("#button-reservation").on("click", function () {
            document.getElementById("alert-canvas").innerHTML = "";
            thisReservation.check_reservation(stationObj)
        });

        //Efface le tracé dans le Canvas
        $("#button-clear").on("click", function () {
            canvasObj.clear_canvas();
        });

        // Cache le panneau de pré-reservation, confirme la reservation et sauvegarde les données dans sessionStorage
        $("#button-save").on("click", function () {
            
            if(canvasObj.clickDrag.length > 0 ){
                document.getElementById("reservation-container").style.display = "none";
                canvasObj.clear_canvas();
                thisReservation.bike_reservation(stationObj, sessionObj);
                sessionObj.save_datas_station(thisReservation, canvasObj);
                thisReservation.countdown_reservation(countdown, sessionObj);
                sessionObj.save_datas_timer();
                sessionObj.web_storage_set_item(); 
            }else{
                document.getElementById("alert-canvas").innerHTML = " Vous devez laisser votre signature pour valider la reservation.";
            }
        });

        //Efface la reservation et supprime la session
        $("#button-reset").on("click", function () {
            sessionObj.clear_web_storage();
            thisReservation.remaining_time = 0;
            document.getElementById("reservation-confirmed").style.visibility = "hidden";
            document.getElementById("confirmation").innerHTML = "";
        });
    }
};
