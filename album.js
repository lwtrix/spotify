const albumCover = document.querySelector(".album-cover");
const artistName = document.querySelector(".posted-by-artist");
const albumYear = document.querySelector("year");
const albumCoverContainer = document.querySelector(".album-cover");
const albumTotalSongs = document.queryCommandValue(".total-songs");
const albumDuration = document.querySelector(".duration");
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

  albumCover.innerHTML = `
    <div class="album-cover-info d-flex justify-content-start mt-3">
            <img
              src="${album.cover}"
              alt="Tribal"
              class="img-fluid image-cover"
            />
            <div class="cover-info ml-4 mt-auto">
              <span class="album-album1">ALBUM</span>
              <span class="album-album d-none">Album <strong>.</strong> ${year}</span>
              <h2 class="hide album-name">${album.title}</h2>
              <p class="album-name pb-0 mb-0 mt-3 show d-none">${album.title}</p>
              <div
                class="song-info d-flex justify-content-end align-items-center"
              >
                <img src="${album.artist.picture}" alt="" class="album-profile-img" />
                <span><h6 class="posted-by-artist artist-name">${album.artist.name}</h6> </span>
                <span class="year "><strong>.</strong> ${year}<strong>.</strong></span>

                <span class="total-songs">${album.nb_tracks} songs</span>
                <span class="duration"><strong>,</strong> ${hr} hr ${mins} min ${seconds} sec</span>
              </div>
            </div>
          </div>
    `;
}
const track = document.querySelector(".track");
function renderAlbumSongs(album) {
  console.log(album.tracks.data);
  console.log(album.tracks.data.length);

  let count = 0;
  for (let i = 0; i < album.tracks.data.length; i++) {
    const durationNatural = Number(album.tracks.data[i].duration);
    console.log(durationNatural);

    const mins = parseInt(durationNatural / 60);
    const seconds = parseInt(durationNatural - mins * 60);
    track.innerHTML += `
    <div class="d-flex song-bar-options align-items-center py-2 mr-4">
            <span class="song-number">${i + 1}</span>
            <div class="d-flex justify-content-between w-100 pr-5">
              <div class="d-flex flex-column ml-4">
                <span class="track-name">${album.tracks.data[i].title}</span>
                <span>${album.tracks.data[i].artist.name}</span>
              </div>
              <div>
                <span>${mins}:${seconds}</span>
              </div>
            </div>
          </div>`;
    count++;
  }
  console.log(count);
}

window.onload = async () => {
  const album = await getAlbum();
  renderAlbum(album);
  renderAlbumSongs(album);
};
// @media screen and (min-width: 480px){

// }
