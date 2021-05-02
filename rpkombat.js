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
let player = document.getElementById("imghero");
let monster = document.getElementById("imgmob");
let kombat;
let message = document.getElementById("message")
let vies = 0;
let receptacle = document.getElementById("receptacle");
let maxCoeurs = 6;
let coeff = 1;
let chance = 0.05;
let spanBlock = document.getElementsByTagName("span")
let regles = document.getElementById("regles")
let mentions = document.getElementById("mention")

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

    console.log(space);
    level = level + 1;
    if (level > 10) {
        level = 10
    }
    coeff = coeff + 2;
    monster.src = "monster" + level + ".gif";
    player.src = "hero" + level + ".gif";
    ajouterVie(3)

    spanBlock[0].innerText = level
}
/* niveau 2 - 4 -6- 8 changement de personnage*/
function previousLevel() {
    if (level === 1) {
        message.innerText = "Retente ta chance";
    }
    else {
        level = level - 1;
        coeff = coeff - 2;
        monster.src = "monster" + level + ".gif";
        player.src = "hero" + level + ".gif";

        spanBlock[0].innerText = level
    }

}
function attaque(heroAtk) {
    /*heroAtk = Vrai: le héros attaque, Faux : le monstre attaque;
    ! signifie l'inverse de la var booléenne, sinon, c'est true*/

    let heroRun = new Audio("newrun.wav");
    heroRun.playbackRate = 2.5;
    heroRun.volume = 0.3;
    
    if (heroAtk) {
        let heroSound = new Audio("attack2.wav");
        let heroHit = new Audio("sword.wav")
        heroHit.volume = 0.2;
        setTimeout(function () {
            heroSound.play();
            heroHit.play();
        }, 600);
        heroRun.play();

        player.animate([
            // keyframes

            { transform: 'translateX(0px) scaleX(-1)' },
            { transform: 'translateX(700px) scaleX(-1)' },
            { transform: 'translateX(0px) scaleX(-1)' },
        ], {
            // timing options
            duration: 1200,
            iterations: 1
        });

    }
    else {

        let heroDmg = new Audio("damaged1.wav");
        let heroHit = new Audio("sword.wav")
        heroHit.volume = 0.2;
    
        heroRun.play();
        setTimeout(function () {
            heroDmg.play();
            heroHit.play();
        }, 600);
        monster.animate([
            // keyframes

            { transform: 'translateX(0px)' },
            { transform: 'translateX(-700px)' },
            { transform: 'translateX(0px)' },
        ], {
            // timing options
            duration: 1200,
            iterations: 1
        });

    }
}
function combat() {
    /* 1-(0.05x1) = 0.95
    1-(0.05x3)=0.85
    1-(0.05x5)=0.75
    1-(0.05x7)=0.65*/

    if (level === 10) {
        if (Math.random() < 1 - 0.9) {
            attaque(true);
            setTimeout(function () {
                let imgwin = document.getElementById("imgwin");
                let imgBlock = document.getElementById("message");
                let hiddenBlock = document.getElementsByClassName("hidden");
                let hiddenRestart = document.getElementById("restart");
                let startButton = document.getElementById("bouton");
                for (let i = 0; i < hiddenBlock.length; i++) {
                    hiddenBlock[i].style.display = "none";
                }
                imgwin.src = "youwin.png"
                imgwin.style.height = "500px";
                imgBlock.style.display = "flex";

                hiddenRestart.style.display = "flex";
                startButton.style.display = "none";

                nextLevel();
            }, 1100);

        }
        else {
            attaque(false);
            setTimeout(function () {
                perdreVie(1)
            }, 1100);
        }

    }
    else if (Math.random() < 1 - (chance * coeff)) {
        attaque(true);
        setTimeout(function () {
            nextLevel();
        }, 1100)


    }
    else {
        attaque(false);
        setTimeout(function () {
            perdreVie(1);
        }, 1100);

    }
}

ajouterVie(3)
function restart() {
    vies = 0
    receptacle.innerHTML = " ";
    level = 0
    coeff = 1
    nextLevel()

    let imgwin = document.getElementById("imgwin");
    let imgBlock = document.getElementById("message");
    let hiddenBlock = document.getElementsByClassName("hidden");
    let hiddenRestart = document.getElementById("restart");
    let startButton = document.getElementById("bouton");
    for (let i = 0; i < hiddenBlock.length; i++) {
        hiddenBlock[i].style.display = "flex";
    }

    imgBlock.style.display = "none";
    hiddenRestart.style.display = "none";
    startButton.style.display = "flex";

}

let bouton = document.getElementById("bouton")
let popup = document.getElementById("menu")
/*let width = window.innerWidth / 2;
console.log(width);
let height = window.innerHeight / 2 - ();
console.log(height);*/
regles.addEventListener("click", function () {

    popup.style.display = "block"
    popup.style.top = window.innerHeight / 2 - (popup.offsetHeight / 2) + "px";
    popup.style.left = window.innerWidth / 2 - (popup.offsetWidth / 2) + "px";
});
menu.addEventListener("click", function () {
    popup.style.display = "none"
});

let popupp = document.getElementById("menus");
mentions.addEventListener("click", function () {
    console.log(mentions);

    popupp.style.display = "block";
    popupp.style.top = window.innerHeight / 2 - (popupp.offsetHeight / 2) + "px";
    popupp.style.right = window.innerWidth / 2 - (popupp.offsetWidth / 2) + "px";
});

popupp.addEventListener("click", function () {
    popupp.style.display = "none"
});


/* menus =

1 créer un block par defaut display none en css créer un bouton dans ce block
300 px par 300px
2 une fois caché au clic le bloc apparait,  qui a pour but de fermer se bloc qui dit il se cache.

*/