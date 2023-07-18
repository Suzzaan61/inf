const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
let ready = false;
let loadedImage = 0;
let totalImages = 0;
// const image = document.getElementsByTagName('img');
let photosArray = [];

let count = 5;
const apiKey = 'I_T9MSQ-BhveR_ThM3BoUUgLJuKAY1qZUbuXxtlA7IU'; 
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    loadedImage++;
    if (loadedImage === totalImages) {
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}


//Helper Function for set arritubates on DOM element
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

//create element for links & photos, Add to DOM
function displayPhotos(){
    loadedImage = 0;
    totalImages = photosArray.length;
    //for each function to access every element of photos array
    photosArray.forEach((photo) => {
        //create a liks to unsplash 
        const item = document.createElement('a');
        // item.setAttribute('href', photo.links.html);
        // item.setAttribute('target', '_blank');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank'
        })
        
        //create img for photo
        const img = document.createElement('img');
        // img.setAttribute('src', photo.urls.regular);
        // img.setAttribute('alt', photo.alt_description);
        // img.setAttribute('title', photo.alt_description);
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description
        })

        //Event listner, check when each image is loaded successfully
        img.addEventListener('load', imageLoaded);

        //put <img> under <a> and put <a> under imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
        
    });


}

// usplash api



//  Getting photo by Api request 
 async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
 }

 //check to see if scrolling is done , load more photos
 window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready){
        getPhotos();
        ready = false;
    }

 })




 //Load photo
 getPhotos();