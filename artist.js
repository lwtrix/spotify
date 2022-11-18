const artistNameMain = document.getElementById("artist-name")
const artistNamePosted = document.getElementById("posted-by-artist")
const artistNamePlaylist = document.getElementById("artist-name-play")
const artistContainer = document.getElementById("artist-main")
const artistCircle = document.getElementById("circle")
const smallAlbum = document.getElementById("album-small")
const trackList = document.getElementById("track-list")
const listenerNumber = document.getElementById("listener-num")
let searchBar = document.getElementById("search-bar")
const searchField = document.querySelector('#searchField')
const artistId = window.location.search.split('?')[1]
const search = new URLSearchParams(artistId)
let id = search.get('id')



const loadArtist = (artistId = id) => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`,
    {
        method: "GET",
    })
    .then((response) => response.json())
    .then((artist) => {
        console.table(artist)
        display(artist)
    })

    .catch((err) => {
        console.error(err)
    })
}

const loadTracks = (artistName) => {
    fetch(
        `https://striveschool-api.herokuapp.com/api/deezer/search?q=${artistName}`,
        {
          method: "GET",
        }
    )
    .then ((response) => response.json())
    .then((response) => {
        console.log(response)
        displayTracks(response.data)
    })
    .catch((err) => {
        console.error(err)
    })
}


// function searchArtist() {
//     let searchQ = searchBar.value
//     loadTracks(searchQ)
// }


const randomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

const display = (artist) => {
    artistNameMain.innerText = ''
    artistNamePosted.innerText = ''
    artistNamePlaylist.innerText = 'Best Of'
    artistContainer.style.backgroundImage = ''
    artistCircle.style.backgroundImage = ''
    smallAlbum.src = ''

    artistNameMain.innerText = artist.name
    artistNamePosted.innerText = artist.name
    artistNamePlaylist.innerText = "Best of " + artist.name
    artistContainer.style.backgroundImage = `url(${artist.picture_xl})`
    artistCircle.style.backgroundImage = `url(${artist.picture_small})`
    smallAlbum.src = artist.picture_medium
    listenerNumber.innerText = randomNumber(100000, 2000000) + " monthly listeners"
    loadTracks(artist.name)
}

const displayTracks = (tracks) => {
    trackList.innerHTML = '';

    tracks.forEach((track, index) => {
        let tr = document.createElement("tr")
        tr.className = "songs"
        tr.innerHTML = `<td class="audio"><span class="hidden"><i class="bi bi-soundwave"></i></span>${index + 1}</td>
        <td><img src="${track.album.cover_small}"></td>
        <td style = "width: 400px"><a href="new_album.html?id=${track.album.id}">${track.title}</a></td>
        <td >${defineDuration(track.duration)}</td>`
        trackList.appendChild(tr)
    })
}

const defineDuration = (t) => {
    return Math.floor(t / 60) + ':' + ('0' + Math.floor(t % 60)).slice(-2)
}

function play() {
    const playBtn = document.getElementById("green-circle-inner")
    if (playBtn.innerHTML === `<i class="fa-solid fa-play"></i>` ) {
        playBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`
    }
    else{
        playBtn.innerHTML = `<i class="fa-solid fa-play"></i>`
    }
}

const checkpoint = 420

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset
    if (currentScroll <= checkpoint) {
        opacity = 1 - currentScroll / checkpoint
    }
    else{
        opacity = 0;
    }
    document.getElementById("artist-main").style.opacity = opacity
})

window.onload = () => {
    loadArtist(id)
}

const fetchData = async (query) => {
    const res = await fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`);
    const finalData = await res.json();
    return finalData.data;
}

let timeoutId;

const searchFetch = async (e) => {

    if(e.target.value) {
        if(timeoutId) {
            clearTimeout(timeoutId)
        }
        
        timeoutId = setTimeout(async () => {
            const data = await fetchData(e.target.value)
            const artistId = data[0].artist.id;
            console.log(artistId)
            loadArtist(artistId)
            }, 500)
    }
    
}

searchField.addEventListener('input', searchFetch)