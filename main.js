//ARRAY DI POST PRESENTI NEL FEED. OGNI ELEMENTO DEVE MOSTRARE LE SUE PROPRIETA'
const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

//Variabili

const containerFeed = document.getElementById("container")

const userLikes = [];


// Stampa dei post nel feed

for (let i = 0; i < posts.length; i++) {
    const currentPost = posts[i];
    containerFeed.innerHTML += postTemplate(currentPost);
}

//FUNZIONE PER GENERARE LA CARD DI UN POSTO NEL FEED

function postTemplate(postData) {

    //Destructuring dell'ogetto aeeganto all'array
    const { id, author, content, created, media, likes } = postData;
    return `
    <div class="post">
        <div class="post__header">
            <div class="post-meta">                    
                <div class="post-meta__icon">
                    ${author.image ? profileWithImage(author) : profileWithImage(author)}                    
                </div>
                <div class="post-meta__data">
                    <div class="post-meta__author">
                        ${author.name}
                    </div>
                    <div class="post-meta__time">
                        ${formatDate(created)}
                    </div>
                </div>                    
            </div>
        </div>
        <div class="post__text">
            ${content}
        </div>
        <div class="post__image">
            <img src="${media}" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <a class="like-button  ${isPostLiked(id) ? 'like-button--liked' : ""} js-like-button href="#">
                        <i class="like-button__icon fas fa-thumbs-up"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </a>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-${id}" class="js-likes-counter">${likes}</b> persone
                </div>
            </div> 
        </div>            
    </div>

    `
}


//BONUS 2 permettere di avere le inizili dell'utente nel caso in cui non abbia una immagine del profilo

function profileWithImage (userData) {
    const { name, image } = userData;
    return `<img class="profile-pic" src="${image}" alt="${name}"> ` 
}

function profileWithoutImage (userData) {

    //Destructuring dell'oggetto
    const { name } = userData;

    //Generiamo le iniziali dell'utente
    const nameParts = name.split(" ");
    
    const letters = [];
    for (let i = 0; i < nameParts.length; i++) {
        const namePart = nameParts[i];
        const initialLetter = namePart[0];
        letters.push(initialLetter);
    }

    const initials = letters.join("");
 
    return`
        <div class="profile-pic-default">
            <span>${initials}</span>
        </div>
    `
}


//BONUS 1 FAR VISUALIZZARE LA DATA NEL FORMATO ITALIANO 

function formatDate(dateStr) {
    return dateStr.split("-").reverse().join("/")
}

//Funzione per i like

function isPostLiked(postId) {
    return userLikes.includes(postId)
}

//LIKE BUTTON

const likeButtons = document.querySelectorAll(".js-like-button");
const likeCounters = document.querySelectorAll(".js-likes-counter")

for (let i = 0; i < likeButtons.length; i++) {

    const element = likeButtons[i];
    element.addEventListener("click", function (e){
        
        e.preventDefault();

        if (!element.classList.contains("like-button--liked")) {

            element.classList.add("like-button--liked");

            //Recuperare il contatore associato al post tramite l'indice i
            const thisCounter = likeCounters[i];

            //Leggere il valore attuale del contatore
            const number = parseInt(thisCounter.innerHTML);

            //Icrementare il valore del contatore
            thisCounter.innerHTML = number + 1;

        } else {

            //Togliere il like
            element.classList.remove("like-button--liked");

            //Recuperare il contatore associato al post tramite l'indice i
            const thisCounter = likeCounters[i];

            //Leggere il valore attuale del contatore
            const number = parseInt(thisCounter.innerHTML);

            //decrementare il valore del contatore
            thisCounter.innerHTML = number - 1;

        }
    })
}