const artistNameMain = document.getElementById("artist-name")
const artistNamePosted = document.getElementById("posted-by-artist")
const artistNamePlaylist = document.getElementById("artist-name-play")
const artistContainer = document.getElementById("artist-main")
const artistCircle = document.getElementById("circle")
const smallAlbum = document.getElementById("album-small")

const artistId = window.location.search.split('?')[1]
const searh = new URLSearchParams(artistId)
const id = searh.get('id')

const loadArtist = () => {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${id}`,
    {
        method: "GET"
    })
    .then((response) => response.json())
    .then((artist) => {
        display(artist)
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
}




window.onload = () => {
    loadArtist()
}