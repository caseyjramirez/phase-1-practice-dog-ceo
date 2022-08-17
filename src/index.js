const d = document;
const imgCont = d.getElementById('dog-image-container');
const dogBreeds = d.getElementById('dog-breeds')
const dropDown = d.getElementById('breed-dropdown');

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = 'https://dog.ceo/api/breeds/list/all';

/*======================== FETCH FUNCTIONS ========================*/
function getResources(url) {
    return fetch(url)
    .then(res => res.json())
}

/*======================== RENDER FUNCTIONS ========================*/
function renderDogImage(data) {
    const img = d.createElement('img')
    img.src = data
    imgCont.append(img)
}

function renderDogBreeds(data) {
    const li = d.createElement('li')
    li.classList.add('breeds')
    li.textContent = data
    dogBreeds.append(li)
}



/*======================== FUNCTIONS ========================*/
function getDogImages() {
    getResources(imgUrl)
    .then(data => data.message.forEach(renderDogImage));
}

function clearDogBreeds() {
    dogBreeds.innerHTML = ''
}

function getDogBreeds() {
    getResources(breedUrl)
    .then(data => {
        for (let breed in data.message) {
            renderDogBreeds(breed)
        }
    })
}

function handleDropDownChange(e) {
    const query = e.target.value;
    
    clearDogBreeds()
    
    getResources(breedUrl)
    .then(data => {
        for (let breed in data.message) {
            if(breed[0] === query) {
                renderDogBreeds(breed)
            }
        }
    })
}



getDogImages()
getDogBreeds()
dropDown.addEventListener('change', handleDropDownChange);