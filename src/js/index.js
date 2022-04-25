import modelsCachedData from './models.js'
import {darkModeButton} from './controls.js'

const modelsDiv = document.querySelector('.main__gallery-sidebar-models');
let modelsData = [];

addSelectingToModels();

try {
  const lampsInfoResponse = await fetch("https://private-anon-1b8bd59dd4-lampshop.apiary-mock.com/lamps");

  if (!lampsInfoResponse.ok) {
    throw new Error('No response from server');
  }

  const lampsInfo = await lampsInfoResponse.json();
  fillModelsDiv(lampsInfo);
} catch(error) {
  const lampsInfo = modelsCachedData;
  fillModelsDiv(lampsInfo);
}

function fillModelsDiv(models) {
  modelsData = models;

  const newModelsDiv = models.map(model => {
    const modelDiv = document.createElement('div');
    modelDiv.className = 'main__gallery-sidebar-model';
    modelDiv.setAttribute('modelId', model.id);

    const modelImg = document.createElement('img');
    modelImg.src = model.image;
    modelImg.className = 'main__gallery-sidebar-model-img';

    modelDiv.append(modelImg);
    return modelDiv;
  });

  const selectedModel = newModelsDiv[0];
  onModelSelected(selectedModel.getAttribute('modelId'));
  selectedModel.classList.add('selected');

  modelsDiv.innerHTML = '';
  for (let newModelDiv of newModelsDiv) {
    modelsDiv.append(newModelDiv);
  }

  addSelectingToModels();
}

function addSelectingToModels() {
  let selectedModel = modelsDiv.querySelector('.selected');

  for (let item of modelsDiv.children) {
    item.addEventListener('click', () => {
      if (item === selectedModel) {
        return;
      }

      selectedModel.classList.toggle('selected');
      selectedModel = item;
      selectedModel.classList.toggle('selected');
      onModelSelected(selectedModel.getAttribute('modelId'));
    })
  }
}

function onModelSelected(modelId) {
  const modelData = modelsData.find(model => model.id === +modelId);

  if (!modelData) {
    return;
  }

  const description = document.querySelector('.main__info-description');

  const material = description.querySelector('.main__info-description-material').querySelector('span');
  material.textContent = modelData.material[0].toUpperCase() + modelData.material.slice(1);

  const dimensions = description.querySelector('.main__info-description-dimensions').querySelector('span');
  dimensions.textContent = `H ${modelData.height} x W ${modelData.width} x D ${modelData.width}`;

  const weight = description.querySelector('.main__info-description-weight').querySelector('span');
  weight.textContent = `${modelData.weight} kg`;

  const electrification = description.querySelector('.main__info-description-electrification').querySelector('span');
  electrification.textContent = modelData.electrification;

  const additionalsLampImg = document.querySelector('.main__additionals-lamp-img');
  additionalsLampImg.src = modelData.image;

  const mainGallery = document.querySelector('.main__gallery');
  const imgTmp = new Image();
  imgTmp.src = 'images/light_background.jpg';
  imgTmp.onload = () => mainGallery.style.backgroundImage = `url('${imgTmp.src}')`;

  const galleryLampImg = document.querySelector('.main__gallery-lamp-img');
  galleryLampImg.src = modelData.image;
  galleryLampImg.style.marginTop = modelData.isDarkMode ? '-12%' : '0';

  darkModeButton.disabled = !modelData.isDarkMode;
}
