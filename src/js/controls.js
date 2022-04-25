export const darkModeButton = document.querySelector('.main__gallery-sidebar-controls-dark');
darkModeButton.addEventListener('click', () => {
  const mainGallery = document.querySelector('.main__gallery');
  const imgTmp = new Image();
  imgTmp.src = 'images/dark_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;
})

export const lightModeButton = document.querySelector('.main__gallery-sidebar-controls-light');
lightModeButton.addEventListener('click', () => {
  const mainGallery = document.querySelector('.main__gallery');
  const imgTmp = new Image();
  imgTmp.src = 'images/light_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;
})