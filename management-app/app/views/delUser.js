import { delUserDataFromApi } from '../models/modelsApi.js';
import { initialUsersList, render } from './viewUsers.js';

export const delUser = async (event, users) => {
  const target = event.target.closest('tr');

  const user = users.find((user) => target.dataset.targetId === user.id);

  await delUserDataFromApi(user.id)
    .then(() => initialUsersList())
    .catch((error) => console.log(error));
};
