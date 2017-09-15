const ALBUM_CONTAINER = document.querySelector('.album-container');
const SELECT_VIEW = document.querySelector('#select-view');
const DETAIL_BOX = document.querySelector('.album-detail');
const DETAIL_TITLE = DETAIL_BOX.querySelector('#album-title');
const DETAIL_IMG = DETAIL_BOX.querySelector('img');
const ALBUM_TRACKLIST = document.querySelector('.album-tracklist > ul');
const SELECTED_TRACKS = document.querySelector('.track-selection > ul');
const CLEAR_BTN = document.querySelector('#clear-btn');
const SUBMIT_BTN = document.querySelector('#submit-btn');

let apiObj;

window.onload = ()=>{
  getJSON(API_URL, obj => {
    apiObj = obj;
    displayAlbums();
  });

  CLEAR_BTN.addEventListener('click',clearSelectedTracks);
  SUBMIT_BTN.addEventListener('click',submit);
}

function displayAlbums() {
  let shuffledAlbums = shuffleArray(apiObj.results);
  for (let album of apiObj.results) {
    let img = document.createElement('img');
    img.src = IMG_URL(album.cover_art);
    img.alt = `${album.artist}: ${album.title}`;
    img.id = album.id;
    ALBUM_CONTAINER.appendChild(img);
    img.addEventListener('click',displayAlbum);
  }
}

function displayAlbum(ev) {
  SELECT_VIEW.classList.remove('hidden');
  let album = apiObj.results.find(a=>a.id === +ev.target.id);
  DETAIL_TITLE.textContent = `${album.artist}: ${album.title}`;
  DETAIL_IMG.src = IMG_URL(album.cover_art);
  displayTrackList(album);
}

function displayTrackList(album) {
  ALBUM_TRACKLIST.textContent = "";
  for (let i = 0; i < album.track_list.length; i++) {
    let track = album.track_list[i];
    let li = document.createElement('li');
    li.textContent = `${track.title} ${track.length}`;
    ALBUM_TRACKLIST.appendChild(li);
    li.addEventListener("click",selectTrack);
    li.id = album.id + ":" + i;
  }
}

let selectedTrackArr = [];

function selectTrack(ev) {
  let oldLi = ev.target;
  let li = document.createElement('li');
  li.textContent = oldLi.textContent;
  li.id = oldLi.id;
  SELECTED_TRACKS.appendChild(li);
  li.addEventListener("click",unselectTrack);
  selectedTrackArr.push(getTrackObjFromIdStr(li.id));
}

function unselectTrack(ev) {
  //surprisingly difficult to remove an element from the array.
  let titleAndLength = ev.target.textContent;
  let lenStart = titleAndLength.search(/[1-9]/);
  let title = titleAndLength.slice(0,lenStart - 1);
  let length = titleAndLength.slice(lenStart);
  let trackObj = selectedTrackArr.find(t=>t.title===title && t.length===length);
  let i = selectedTrackArr.indexOf(trackObj);
  selectedTrackArr.splice(i,1);
  ev.target.parentNode.removeChild(ev.target);
}

function getTrackObjFromIdStr(str) {
  let i = str.indexOf(':');
  let albumId = str.slice(0,i);
  let trackIndex = str.slice(i+1);
  let album =  apiObj.results.find(a=>a.id===+albumId);
  return album.track_list[trackIndex];
}

function clearSelectedTracks() {
  selectedTrackArr = [];
  SELECTED_TRACKS.textContent = "";
}

function submit() {
  let url = 'https://lit-fortress-6467.herokuapp.com/post';
  let obj = selectedTrackArr;
  let callback = (response)=>{console.log(response)};
  post(url,obj,callback);
}
