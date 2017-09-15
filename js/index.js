const SPLASH_ALBUMS = document.querySelectorAll('.img-col>img');

window.onload = ()=>{
  getJSON(API_URL, (obj)=>{
    console.log(obj);
    let splashArr = [];
    for (let i = 0; i < SPLASH_ALBUMS.length; i++) {
      let r = Math.floor(Math.random() * obj.results.length);
      while (splashArr[r]) {
        r = Math.floor(Math.random() * obj.results.length);
      }
      splashArr[r] = true;
      SPLASH_ALBUMS[i].src = IMG_URL(obj.results[r].cover_art);
    }
  });
}
