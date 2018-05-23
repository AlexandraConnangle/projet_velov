/*------------------------- OBJETS ---------------------------------*/

var diaporama = Object.create(diaporama);

var mapApi = Object.create(googleApi);
var veloApi = Object.create(jcDecauxApi);

var veloV = Object.create(veloStation);
var signature = Object.create(canvas);
var reservation = Object.create(reservationManager);
var sessionWeb = Object.create(webStorage);

/*--------------------- Initialisation Map -------------------------*/
var map;

function initMap() {
    mapApi.init_map();
    veloApi.get_infos(mapApi, veloV);
};

/*--------------------- EVENEMENTS ---------------------------------*/
$(function () {

    /*------------------- DIAPORAMA ------------------------*/

    $(window).on("load", diaporama.load());

    /*------------------- SCROOL NAV -----------------------*/

    $('nav li a').on("click", function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $('#' + $(this).data("scroll")).offset().top
        }, 1000);
    })

    /*-------------------- RESERVATION ---------------------*/

    signature.create_canvas();
    reservation.buttons_event(veloV, signature, sessionWeb);

    if (sessionStorage['reservationBike']) {
        sessionWeb.restore_reservation(veloV, reservation, sessionWeb);
    }
});