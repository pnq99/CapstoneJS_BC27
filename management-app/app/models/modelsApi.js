const URL =
  'https://629757ee14e756fe3b2dcf70.mockapi.io/person';

export const getUsersDataFromApi = async () => {
  try {
    const res = await fetch(URL, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error('get api failed');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const postUserDataToApi = async (inputUser) => {
  try {
    const res = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify(inputUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Add user failed');
    }
  } catch (error) {
    console.log(error);
  }
};

export const delUserDataFromApi = async (userId) => {
  try {
    const res = await fetch(`${URL}/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Delete user data failed');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const updateUserToApi = async (updatedUser) => {
  try {
    const res = await fetch(`${URL}/${updatedUser.id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedUser),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('something wrong');
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const searchUserDataFromQueryApi = async (query) => {
  try {
    // search by name
    const res = await fetch(`${URL}?name=${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      throw new Error('Search failed');
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error.message);
  }
};
