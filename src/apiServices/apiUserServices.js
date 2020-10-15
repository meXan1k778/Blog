const fetchRegistration = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: { email: data.email, password: data.password, username: data.username } }),
  });

  if (!request.ok) {
    throw new Error(`Could not fetch!!! recived status: ${request.status}`);
  }

  return request.json();
};

const fetchLogIn = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: { email: data.email, password: data.password } }),
  });

  if (!request.ok) {
    throw new Error(`Could not fetch!!! recived status: ${request.status}`);
  }

  return request.json();
};

const fetchCookie = async (token) => {
  const request = await fetch(`https://conduit.productionready.io/api/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!request.ok) {
    throw new Error(`Could not fetch!!! recived status: ${request.status}`);
  }

  return request.json();
};

const fetchEditProfile = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: { email: data.email, password: data.password, username: data.username, image: data.avatar } }),
  });

  if (!request.ok) {
    throw new Error(`Could not fetch!!! recived status: ${request.status}`);
  }

  return request.json();
};



export {
  fetchRegistration,
  fetchLogIn,
  fetchCookie,
  fetchEditProfile,
};
