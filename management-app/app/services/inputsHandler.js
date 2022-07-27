import { checkValidation } from './validation.js';

export const getValueFromInput = () => {
  const name = document.getElementById('namePro').value;
  const price = document.getElementById('pricePro').value;
  const screen = document.getElementById('screenPro').value;
  const backCamera = document.getElementById('backCameraPro').value;
  const frontCamera = document.getElementById('frontCameraPro').value;
  const img = document.getElementById('imgPro').value;
  const desc = document.getElementById('descPro').value;
  const type = document.getElementById('typePro').value;

  return {
    name,
    price,
    screen, 
    backCamera,
    frontCamera,
    img,
    desc,
    type
  };
};

export const fillValueToInput = (user) => {
  const { name, price, screen, backCamera,frontCamera, img, desc, type } = user;

  document.getElementById('namePro').value = name || '';
  document.getElementById('pricePro').value = price || '';
  document.getElementById('screenPro').value = screen || '';
  document.getElementById('backCameraPro').value = backCamera || '';
  document.getElementById('frontCameraPro').value = frontCamera || '';
  document.getElementById('imgPro').value = img || '';
  document.getElementById('descPro').value = desc || '';
  document.getElementById('typePro').value = type || '';
};
