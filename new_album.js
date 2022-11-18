const albumCover = document.getElementById("album-artwork-top")
const albumName = document.getElementById("album-name")
const artistName = document.getElementById("artist-name");
const albumYear = document.getElementById("album-year")
const albumTotalSongs = document.getElementById("song-num")
const albumDuration = document.getElementById("album-duration")
const albumId = window.location.search.split('?')[1]
const search = new URLSearchParams(albumId)
let id = search.get('id')

//try {



async function getAlbum() {
  const response = await fetch(
    `https://striveschool-api.herokuapp.com/api/deezer/album/${id}`,
    {
      method: "GET",
    }
  );
  const album = await response.json();
  console.log(album);
  return album;
}
// } catch (error) {
//   window.alert("Something went wrong during Album fetch");
// }

function renderAlbum(album) {
  console.log(album)
  console.log(album.release_date);
  const durationNatural = Number(album.duration);
  const duration = Number(album.duration) / 3600;
  //if (duration >= 1) {
  const hr = parseInt(duration);
  const mins = parseInt((durationNatural - hr * 3600) / 60);
  const seconds = parseInt(durationNatural - hr * 3600 - mins * 60);
  console.log(seconds);
  let date = new Date(album.release_date);
  let year = date.getFullYear();
  console.log(year);

  albumCover.src = `${album.cover_medium}`
  albumName.innerText = `${album.title}`
  artistName.innerHTML = `<a href="artist.html?id=${album.artist.id}">` + "By " + `${album.artist.name}` + " " + `</a>`
  albumYear.innerText = " " + `${year}` + " "
  albumTotalSongs.innerText = `${album.nb_tracks}` + " songs"
  albumDuration.innerText = `${hr}` + " hrs " + `${mins}` + " min "
}

function renderAlbumSongs(album) {
  console.log(album.tracks.data);
  console.log(album.tracks.data.length);

  let trackList = document.getElementById("track-list")

  let count = 0;
  for (let i = 0; i < album.tracks.data.length; i++) {
    const durationNatural = Number(album.tracks.data[i].duration);
    let tr = document.createElement("tr")
    let time = defineDuration(durationNatural)       
    tr.innerHTML = `<td class="audio"><span class="hidden"><i class="bi bi-soundwave"></i></span>${i+ 1}</td>
    <td style = "width: 60vw">${album.tracks.data[i].title} <br> <a href="/artist.html?id=${album.artist.id}"><span id="artist-sub">${album.artist.name}</span></a></td>
    <td >${time}</td>`
    trackList.appendChild(tr)
    count++;
  }
  console.log(count);
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

const defineDuration = (t) => {
  return Math.floor(t / 60) + ':' + ('0' + Math.floor(t % 60)).slice(-2)
}

window.onload = async () => {
  const album = await getAlbum();
  renderAlbum(album);
  renderAlbumSongs(album);
};
// @media screen and (min-width: 480px){

// }
