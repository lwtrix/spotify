const artistNameMain = document.getElementById("artist-name")
const artistNamePosted = document.getElementById("posted-by-artist")
const artistNamePlaylist = document.getElementById("artist-name-play")
const artistContainer = document.getElementById("artist-main")
const artistCircle = document.getElementById("circle")
const smallAlbum = document.getElementById("album-small")
const trackList = document.getElementById("track-list")
const artistId = window.location.search.split('?')[1]
const search = new URLSearchParams(artistId)
let id = search.get('id')



const loadArtist = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`,
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
        displayTracks(response.data)
    })
    .catch((err) => {
        console.error(err)
    })
}

const display = (artist) => {
    console.log(artist)
    artistNameMain.innerText = artist.name
    artistNamePosted.innerText = artist.name
    artistNamePlaylist.innerText = "Best of " + artist.name
    artistContainer.style.backgroundImage = `url(${artist.picture_xl})`
    artistCircle.style.backgroundImage = `url(${artist.picture_small})`
    smallAlbum.src = artist.picture_medium
    loadTracks(artist.name)
}

const displayTracks = (tracks) => {
    tracks.forEach((track, index) => {
        let tr = document.createElement("tr")
        tr.innerHTML = `<td>${index + 1}</td>
        <td><img src="${track.album.cover_small}"></td>
        <td style = "width: 400px"><a href="#">${track.title}</a></td>
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

window.onload = () => {
    loadArtist(id)
}