var diaporama = {

    items: {},
    lenght: {},
    deg: {},
    z: {},
    move: 0,

    //Fonction qui lance le diaporama et les écouteurs d'évènements liés.
    load: function () {
        this.items = document.getElementsByClassName("item");
        this.length = this.items.length;
        this.deg = 360 / this.length;
        this.z = (this.items[0].offsetWidth / 2) / Math.tan((this.deg / 2) * (Math.PI / 180));

        for (var i = 0; i < this.length; i++) {
            this.items[i].style.transform = "rotateY(" + (this.deg * i) + "deg) translateZ(" + this.z + "px)";
        }
        
        this.buttons_event();
        this.keypress_event();
    },

    //Fonction qui fait tourner le diaporama
    rotate: function (direction) {
        this.move += direction;
        for (var i = 0; i < this.length; i++) {
            this.items[i].style.transform = "rotateY(" + (this.deg * (i + this.move)) + "deg) translateZ(" + this.z + "px)";
        };
    },
    
    //Ecouteur d'évènement au click sur les boutons
    buttons_event: function(){
        $("#next-button").on("click", function () {
            diaporama.rotate(-1);
        });

        $("#prev-button").on("click", function () {
            diaporama.rotate(1);
        });
    },
    
    //Ecouteur d'évènement à la pression des flèches du clavier
    keypress_event: function(){
        $(window).on("keydown", function (e) {
            if(e.keyCode === 39){
                $("#next-button").click();
            } 
            if(e.keyCode === 37){
                $("#prev-button").click();
            }
        });
    }
};
