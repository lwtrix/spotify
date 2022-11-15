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

const renderPills = (arr) => {

    const data = arr.filter(item => arr.indexOf(item) < 10);

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

const renderAlbums = (arr) => {

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
    const albums = await fetchData('dark')
    const tracks = await fetchData('road')

    renderPills(pills)
    renderAlbums(albums)
    renderTracks(tracks)
})