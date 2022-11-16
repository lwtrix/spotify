const pillsRow = document.querySelector('#pillsRow');
const albumsRow = document.querySelector('#albumsRow');
const tracksRow = document.querySelector('#tracksRow');


const options = {
    headers: {
        "X-RapidAPI-Key": "ab2594bb9cmsh5be1c87d88bb0c1p112766jsn50e27924ed47",
        "Content-Type": "application/json"
    }
}

const fetchData = async (query) => {
    const res = await fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`, options);
    const finalData = await res.json();
    return finalData.data;
}

const renderPills = (arr, amount = 10) => {

    const data = arr.filter(item => arr.indexOf(item) < amount);
    pillsRow.innerHTML = '';

    for(let item of data) {
        pillsRow.innerHTML += `
            <div class="track-pill">
                <div class="img-container">
                    <img src="${item.artist.picture_medium}" alt="">
                </div>
                <div class="track-details">
                    <p class="text">${item.title}</p>
                </div>
            </div>
        `
    }
}

const renderAlbums = (arr, mobile = true) => {
    const seeAllText = document.querySelector('#albumsRow .see-all');
    const heading = document.querySelector('.albums-row .heading');
    
    if(mobile === false) {

        seeAllText.style.display = 'block'
        heading.style.display = 'block'
        const data = arr.filter(item => arr.indexOf(item) < 8);

        for(let item of data) {
            albumsRow.innerHTML += `
            <div class="card">
                <div class="img-container">
                    <img src="${item.album.cover_medium}" alt="">
                </div>
                <div class="card-details">
                    <p class="title">${item.album.title}</p>
                    <a href="artist.html?id=${item.artist.id}" class="artist">${item.artist.name}</a>
                </div>
            </div>
        `
        } 
    } else {

        seeAllText.style.display = 'none';
        heading.style.display = 'none';

        const data = arr.filter(item => arr.indexOf(item) < 1);

        for(let item of data) {
            albumsRow.innerHTML += `
            
                    <div class="wide-card-mobile">
                        <div class="album-author">
                            <div class="img-container">
                                <img src="${item.artist.picture_medium}" />
                            </div>
                            <div class="text-container">
                                <p class="text">New Release from</p>
                                <p class="author-name">${item.artist.name}</p>
                            </div>
                        </div>
                        <div class="album-details">
                            <div class="img-container">
                                <img src="${item.album.cover_medium}" alt="">
                            </div>
                            <div class="album-content">
                                <div class="text-container">
                                    <p class="title">${item.album.title}</p>
                                    <a href="artist.html?id=${item.artist.id}" class="artist">${item.artist.name}</a>
                                </div>
                                <div class="album-controls">
                                    <img class="heart-icon" src="./assets/heart.svg" />
                                    <div class="btn-container">
                                        <div class="play-btn"></div>
                                    </div>
                                    
                                </div>    
                            </div>
                        </div>
                        
                    </div>
            
        `
        } 
    }
    
    
}

const renderTracks = (arr) => {

    const data = arr.filter(item => arr.indexOf(item) < 8);

    for(let item of data) {
        tracksRow.innerHTML += `
            <div class="card">
                <div class="img-container">
                    <img src="${item.artist.picture_medium}" alt="">
                </div>
                <div class="card-details">
                    <p class="title">${item.title}</p>
                    <a href="artist.html?id=${item.artist.id}" class="artist">${item.artist.name}</a>
                </div>
            </div>
        `
    }
}

window.addEventListener('load', async () => {
    const pills = await fetchData('high')
    const albums = await fetchData('rise')
    const tracks = await fetchData('back')

    renderPills(pills)
    renderAlbums(albums)
    renderTracks(tracks)
})


window.onresize = () => {
    let timeoutId = 0;
    timeoutId = setTimeout(async () => {
        if(timeoutId) {
            clearTimeout(timeoutId)
        }

        const pills = await fetchData('high')
        if(window.innerWidth < 860) {
            renderPills(pills, 6)
        } else if(window.innerWidth > 860) {
            renderPills(pills, 10)
        }
    }, 1000)
}