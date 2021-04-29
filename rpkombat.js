/*rp kombat.
regle:
créer 10 créatures differentes.
Taux de réussite par créature :
1:95%, 2.85%, 3.75%, 4.65%, 5.55%, 6.45%, 7.35%, 8.25%, 9.15%, 10.10%

Le joueur à 3vie :
si le joueur perd un combat il perd une vie. et peux continuer le combat.
si le joueur remporte il gagne + 3 vie.
si le joueur gagne 1combat le joueur passe au niveau superieur

si le joueur monte de niveau il change d'apparence.

à faire:
un bloc avec la photo du joueur et son pseudonyme au dessus. et son niveau
sur la droite  on affiche la créature à combatre

la photo de la creature et son nom change à chaque nouvelle creature.
l'apparence à chaque niveau change.

un coeur pour les vie et afficher en haut pour chaque vie et disparait quand il perd sa vie.

compter le nombre d'essaie depuis le debut. 

en bas de la page une page des scores. chaque joueur qui a reussit et afficher avec son :
pseudo : nombre de vie utilisé. */

let level = 1;
let player;
let monster;
let kombat;
let message = document.getElementById("message")
let vies = 0;
let receptacle = document.getElementById("receptacle");
let maxCoeurs = 10;
let coeff = 1;
let chance = 0.05;


function ajouterVie(n) {
    if (vies + n <= maxCoeurs) {
        vies = vies + n;
        for (let i = 0; i < n; i++) {
            let image = document.createElement("img");
            image.src = "https://media.discordapp.net/attachments/263056867968811011/836998042053640212/oie_JSnCa0i5khut.png";
            image.alt = "coeur de vie";
            image.classList = "icone";
            receptacle.appendChild(image);
        }
        /* pour n vies, tant que n est supp a 0, alors on fait un truc et ensuite on décrémente n */
    }
    else {
        let diff = maxCoeurs - vies;
        vies = maxCoeurs
        for (let i = 0; i < diff; i++) {
            let image = document.createElement("img");
            image.src = "https://media.discordapp.net/attachments/263056867968811011/836998042053640212/oie_JSnCa0i5khut.png";
            image.alt = "coeur de vie";
            image.classList = "icone";
            receptacle.appendChild(image);
        }
    }
    /* créer une balise html avec js */
}
function perdreVie(n) {

    if (vies - n >= 1) {
        vies = vies - n;
        for (let i = 0; i < n; i++) {
            let image = receptacle.lastChild;
            receptacle.removeChild(image);

        }
    }
    else {
        vies = 0;
        receptacle.innerHTML = " ";
        ajouterVie(3);
        previousLevel()
    }
}
function nextLevel() {
    level = level + 1;
    coeff = coeff + 2;
    let imgmob = document.getElementById("imgmob");
    imgmob.src = "monster" + level + ".gif";
    let imghero = document.getElementById("imghero");
    imghero.src = "hero" + level + ".gif";
    ajouterVie(3)
}
/* niveau 2 - 4 -6- 8 changement de personnage*/
function previousLevel() {
    if (level === 1) {
        message.innerText = "Retente ta chance";
    }
    else {
        level = level - 1;
        coeff = coeff - 2;
        let imgmob = document.getElementById("imgmob");
        imgmob.src = "monster" + level + ".gif";
        let imghero = document.getElementById("imghero");
        imghero.src = "hero" + level + ".gif";


    }

}
function combat() {
    /* 1-(0.05x1) = 0.95
    1-(0.05x3)=0.85
    1-(0.05x5)=0.75
    1-(0.05x7)=0.65*/
    
    if (level === 10) {
        if (Math.random() < 1 - 0.9) {
            let imgwin = document.getElementById("imgwin");
            let imgBlock = document.getElementById("message");
            let hiddenBlock = document.getElementsByClassName("hidden");
            let hiddenRestart = document.getElementById("restart");
            let startButton = document.getElementById("bouton");
            for (let i = 0; i < hiddenBlock.length; i++) {
                hiddenBlock[i].style.display = "none";
            }
            imgwin.src = "https://www.eclypsia.com/public/upload/cke/Articles/LoL/PBE%20Octobre%202014/Victory.png"
            imgwin.style.height = "500px";
            imgBlock.style.display = "flex";
            
            hiddenRestart.style.display="flex";
            startButton.style.display="none";

            nextLevel();
        }
        else {
            perdreVie(1)
        }

    }
    else if (Math.random() < 1 - (chance * coeff)) {
        nextLevel();

    }
    else {
        perdreVie(1);
    }
}

ajouterVie(3)
/*function restart(){
    perdreVie(10)
    level= 1
    let imgwin = document.getElementById("imgwin");
    let imgBlock = document.getElementById("message");
    let hiddenBlock = document.getElementsByClassName("hidden");
    let hiddenRestart = document.getElementById("restart");
    let startButton = document.getElementById("bouton");
    for (let i = 0; i < hiddenBlock.length; i++) {
        hiddenBlock[i].style.display = "flex";
    }
    
    imgwin.style.display = "none";
    imgBlock.style.display = "flex";
    hiddenRestart.style.display="none";
    startButton.style.display="flex";
    ajouterVie(3)
    combat()
    
}*/

let bouton = document.getElementById("bouton")



