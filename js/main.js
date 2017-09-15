console.log('bark!');
window.onload = ()=>{
  let images = document.querySelectorAll('img');
  for (let i = 0; i < 3; i++) {
    images[i].src = './images/21.jpg';
  }
}
