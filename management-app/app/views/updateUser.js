import { updateUserToApi } from '../models/modelsApi.js';
import User from '../models/Users.js';

import {
  markupContentHandler,
  updateButtonMarkup,
} from '../controllers/controllerMarkup.js';

import {
  fillValueToInput,
  getValueFromInput,
} from '../services/inputsHandler.js';
import { resetForm } from '../services/resetForm.js';
import { checkValidation } from '../services/validation.js';

import { initialUsersList } from './viewUsers.js';

const updateUser = async (user) => {
  try {
    const action = 'update';
    const { name, price, screen, backCamera,frontCamera, img, desc, type } =
      getValueFromInput();

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

    if (!isValid) return;

    const updatedUser = new User(
      user.id,
      name,
      price,
      screen, 
      backCamera,
      frontCamera,
      img,
      desc,
      type
    );

    updateUserToApi(updatedUser).then(() => {
      initialUsersList();
    });

    resetForm();
    return;
  } catch (error) {
    let newErrorMessage = error.message;
    newErrorMessage = 'không nhập được dữ liệu';
    document
      .getElementById('updateUserBtn')
      .closest('div').previousElementSibling.innerHTML = newErrorMessage;

    return;
  }
};

export const selectUser = (event, users) => {
  markupContentHandler('Cập nhật người dùng', updateButtonMarkup);
  const updateUserBtn = document.getElementById('updateUserBtn');

  const target = event.target.closest('tr');
  const user = users.find((user) => target.dataset.targetId === user.id);

  fillValueToInput(user);

  updateUserBtn.addEventListener('click', function () {
    updateUser(user);
  });
};
