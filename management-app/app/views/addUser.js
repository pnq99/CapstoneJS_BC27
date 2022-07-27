import User from '../models/Users.js';
import { getUsersDataFromApi, postUserDataToApi } from '../models/modelsApi.js';

import {
  addButtonMarkup,
  markupContentHandler,
} from '../controllers/controllerMarkup.js';

import { getValueFromInput } from '../services/inputsHandler.js';
import { btnThemSanPham } from '../services/elements.js';
import { resetForm } from '../services/resetForm.js';

import { initialUsersList } from './viewUsers.js';
import { checkValidation } from '../services/validation.js';

import { myModal } from '../services/elements.js';

btnThemSanPham.addEventListener('click', function (e) {
  e.preventDefault();

  markupContentHandler('Thêm sản phẩm', addButtonMarkup);
  resetForm();
  myModal.querySelectorAll('span').forEach((span) => {
    span.innerHTML = '';
  });

  const addUserBtn = document.getElementById('addUserBtn');
  addUserBtn.addEventListener('click', addUser);
});

const addUser = async () => {
  try {
    const action = 'add';
    const { name, price, screen, backCamera, frontCamera, img, desc, type} = getValueFromInput();

    const isValid = checkValidation(
      name,
      price,
      screen, 
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );

    console.log(isValid);

    if (!isValid) return;

    const newUser = new User(
      null,
    
      name,
      price,
      screen, 
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );

    postUserDataToApi(newUser).then(function () {
      initialUsersList();
    });

    resetForm();

    return;
  } catch (error) {
    let newErrorMessage = error.message;
    newErrorMessage = 'không nhận được dữ liệu';
    document
      .getElementById('addUserBtn')
      .closest('div').previousElementSibling.innerHTML = newErrorMessage;

    return;
  }
};
