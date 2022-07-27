import User from '../models/Users.js';

import { searchUserDataFromQueryApi } from '../models/modelsApi.js';
import { searchInput } from '../services/elements.js';
import { render } from './viewUsers.js';

// search by name
const getSearchedUserData = async (value) => {
  try {
    const searchedUsersData = await searchUserDataFromQueryApi(value);

    const users = searchedUsersData.map(
      (user, i) =>
        (user = new User(
          searchedUsersData[i].id,
          searchedUsersData[i].name,
          searchedUsersData[i].price,
          searchedUsersData[i].screen,
          searchedUsersData[i].backCamera,
          searchedUsersData[i].frontCamera,
          searchedUsersData[i].img,
          searchedUsersData[i].desc,
          searchedUsersData[i].type
        ))
    );

    render(users);
  } catch (error) {
    console.log(error);
  }
};

searchInput.addEventListener('keypress', function (event) {
  if (event.key !== 'Enter') return;
  const value = event.target.value;

  getSearchedUserData(value);
});
