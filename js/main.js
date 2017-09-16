const API_URL = 'http://randomraccoon-albums.surge.sh/albums';
const IMG_URL = end => './images/' + end;
const COVER_ART_FROM_URL = url => url.slice(url.lastIndexOf('/')+1);

function getJSON(url, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    let obj = JSON.parse(xhr.response);
    callback(obj);
  };
  xhr.onerror = () => {
    callback(xhr.response);
  };
  xhr.open('GET', url);
  xhr.send();
}

//There's a good chance this has an error somewhere, but it's hard to check without some sort of feedback from the receiver
function post(url, obj, callback) {
  let xhr = new XMLHttpRequest();
  xhr.onload = () => {
    callback(xhr.response);
  };
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
  xhr.open('POST', url);
  xhr.send(JSON.stringify(obj));
}

// https://stackoverflow.com/a/12646864/4526570
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
