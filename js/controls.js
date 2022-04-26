import isHighResolutionScreen from './utils.js'

export const darkModeButton = document.querySelector('.main__gallery-sidebar-controls-dark');
darkModeButton.addEventListener('click', () => {
  const mainGallery = document.querySelector('.main__gallery-container');
  const imgTmp = new Image();
  imgTmp.src = isHighResolutionScreen() ? 'images/dark_background_2x.jpg' : 'images/dark_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;
  const lampImg = document.querySelector('.main__gallery-lamp-img');
  lampImg.style.display= "none";
})

export const lightModeButton = document.querySelector('.main__gallery-sidebar-controls-light');
lightModeButton.addEventListener('click', () => {
  const mainGallery = document.querySelector('.main__gallery-container');
  const imgTmp = new Image();
  imgTmp.src = isHighResolutionScreen() ? 'images/light_background_2x.jpg' : 'images/light_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;
  const lampImg = document.querySelector('.main__gallery-lamp-img');
  lampImg.style.display= "block";
})
