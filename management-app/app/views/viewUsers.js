import {tblDanhSachSanPham } from '../services/elements.js';

import User from '../models/Users.js';
import { getUsersDataFromApi } from '../models/modelsApi.js';

import { markup } from '../controllers/controllerMarkup.js';
import { delUser } from './delUser.js';
import { selectUser } from './updateUser.js';
import { resetForm } from '../services/resetForm.js';

export const render = (users) => {
  let html = '';
  users.forEach((user) => {
    html += markup(user);
  });

  tblDanhSachSanPham.innerHTML = html;
};

export const initialUsersList = async () => {
  try {
    const usersData = await getUsersDataFromApi();

    const users = usersData.map(
      (user, i) =>
        (user = new User(
          usersData[i].id,          
          usersData[i].name,
          usersData[i].price,
          usersData[i].screen,
          usersData[i].backCamera,
          usersData[i].frontCamera,
          usersData[i].img,
          usersData[i].desc,
          usersData[i].type
        ))
    );

    render(users);

    const delUserBtns = document.querySelectorAll('[data-btn=del]');
    delUserBtns.forEach((delUserBtn) => {
      delUserBtn.addEventListener('click', function (event) {
        delUser(event, users);
      });
    });

    const updateUserBtns = document.querySelectorAll('[data-btn=update]');
    updateUserBtns.forEach((updateUserBtn) => {
      updateUserBtn.addEventListener('click', function (event) {
        selectUser(event, users);
      });
    });
  } catch (error) {
    console.log(error.message);
  }
};

initialUsersList();
