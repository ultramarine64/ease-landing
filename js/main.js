import modelsCachedData from './models.js'

let lightModeButton = document.querySelector('.main__gallery-sidebar-controls-light');
let darkModeButton = document.querySelector('.main__gallery-sidebar-controls-dark');

darkModeButton.addEventListener('click', () => {
  let mainGallery = document.querySelector('.main__gallery');
  let imgTmp = new Image();
  imgTmp.src = 'images/dark_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;
})

lightModeButton.addEventListener('click', () => {
  let mainGallery = document.querySelector('.main__gallery');
  let imgTmp = new Image();
  imgTmp.src = 'images/light_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;
})

let modelsDiv = document.querySelector('.main__gallery-sidebar-models');
let modelsData = [];

addToggleToModels();

try {
  let lampsInfoResponse = await fetch("https://private-anon-1b8bd59dd4-lampshop.apiary-mock.com/lamps");

  if (!lampsInfoResponse.ok) {
    throw new Error('No response from server');
  }

  const lampsInfo = await lampsInfoResponse.json();
  fillModelsDiv(lampsInfo);
} catch(error) {
  const lampsInfo = modelsCachedData.data;
  fillModelsDiv(lampsInfo);
}

function fillModelsDiv(models) {
  modelsData = models;

  let newModelsDiv = models.map(model => {
    let modelDiv = document.createElement('div');
    modelDiv.className = 'main__gallery-sidebar-model';
    modelDiv.setAttribute('modelId', model.id);

    let modelImg = document.createElement('img');
    modelImg.src = model.image;
    modelImg.className = 'main__gallery-sidebar-model-img';

    modelDiv.append(modelImg);
    return modelDiv;
  });

  modelsDiv.innerHTML = '';
  for (let newModelDiv of newModelsDiv) {
    modelsDiv.append(newModelDiv);
  }

  addToggleToModels();
}

function addToggleToModels() {
  let selectedModel = modelsDiv.querySelector('.selected');

  if (!selectedModel) {
    selectedModel = modelsDiv.children[0];
    updateModelDescription(selectedModel.getAttribute('modelId'));
    selectedModel.classList.add('selected');
  }

  for (let item of modelsDiv.children) {
    item.addEventListener('click', () => {
      if (item === selectedModel) {
        return;
      }

      selectedModel.classList.toggle('selected');
      selectedModel = item;
      selectedModel.classList.toggle('selected');
      updateModelDescription(selectedModel.getAttribute('modelId'));
    })
  }
}

function updateModelDescription(modelId) {
  const modelData = modelsData.find(model => model.id === +modelId);

  if (!modelData) {
    return;
  }

  let description = document.querySelector('.main__info-description');

  let material = description.querySelector('.main__info-description-material').querySelector('span');
  material.textContent = modelData.material[0].toUpperCase() + modelData.material.slice(1);

  let dimensions = description.querySelector('.main__info-description-dimensions').querySelector('span');
  dimensions.textContent = `H ${modelData.height} x W ${modelData.width} x D ${modelData.width}`;

  let weight = description.querySelector('.main__info-description-weight').querySelector('span');
  weight.textContent = `${modelData.weight} kg`;

  let electrification = description.querySelector('.main__info-description-electrification').querySelector('span');
  electrification.textContent = modelData.electrification;

  let additionalsLampImg = document.querySelector('.main__additionals-lamp-img');
  additionalsLampImg.src = modelData.image;

  let mainGallery = document.querySelector('.main__gallery');
  let imgTmp = new Image();
  imgTmp.src = 'images/light_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;

  let galleryLampImg = document.querySelector('.main__gallery-lamp-img');
  galleryLampImg.src = modelData.image;
  galleryLampImg.style.marginTop = modelData.isDarkMode ? '-12%' : '0';

  darkModeButton.disabled = !modelData.isDarkMode;
}