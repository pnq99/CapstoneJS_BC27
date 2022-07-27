import {
  delUserDataFromApi,
  getUsersDataFromApi,
} from '../models/modelsApi.js';

import {

  nameInput,
  priceInput,
  screenInput, 
  backCameraInput,
  frontCameraInput,
  imgInput,
  descInput,
  typeInput

} from './elements.js';

const usersData = await getUsersDataFromApi();

const isRequired = (value) => {
  if (!value) {
    return false;
  }
  return true;
};

const nameCheck = (name) => {
  const namePattern = new RegExp('^[A-Za-z_ ]+$');
  if (!isRequired(name)) {
    nameInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    nameInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const priceCheck = (price) => {
  if (!isRequired(price)) {
    priceInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    priceInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const screenCheck = (screen) => {
  if (!isRequired(screen)) {
    screenInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    screenInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const backCameraCheck = (backCamera) => {
  if (!isRequired(backCamera)) {
    backCameraInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    backCameraInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const frontCameraCheck = (frontCamera) => {
  if (!isRequired(frontCamera)) {
    frontCameraInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    frontCameraInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const imgCheck = (img) => {
  if (!isRequired(img)) {
    imgInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    imgInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const descCheck = (desc) => {
  if (!isRequired(desc)) {
    descInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    descInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

const typeCheck = (type) => {
  if (!isRequired(type)) {
    typeInput.nextElementSibling.innerHTML = 'Bạn không được để trống';
    return false;
  } else {
    typeInput.nextElementSibling.innerHTML = '';
    return true;
  }
};

export const checkValidation = (
  name,
  price,
  screen, 
  backCamera,
  frontCamera,
  img,
  desc,
  type
) => {
  let isValid;
 
  const nameIsValid = nameCheck(name);
  const priceIsValid = priceCheck(price);
  const screenIsValid = screenCheck(screen);
  const backCameraIsValid = backCameraCheck(backCamera);
  const frontCameraIsValid = frontCameraCheck(frontCamera);
  const imgIsValid = imgCheck(img);
  const descIsValid = descCheck(desc);
  const typeIsValid = typeCheck(type);

  if (
  
    nameIsValid &&
    priceIsValid &&
    screenIsValid &&
    backCameraIsValid &&
    frontCameraIsValid &&
    imgIsValid &&
    descIsValid &&
    typeIsValid
  ) {
    isValid = true;
  } else {
    isValid = false;
  }

  return isValid;
};
