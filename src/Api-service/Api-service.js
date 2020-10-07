const fetchRegistration = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: { email: data.email, password: data.password, username: data.username } }),
  });

  return request.json();
};

const fetchArticlesList = async (page = 1) => {
  const res = await fetch(`https://conduit.productionready.io/api/articles?limit=5&offset=${page}`);

  if (!res.ok) {
    throw new Error(`Could not fetch!!! recived status: ${res.status}`);
  }

  return res.json();
};

const fetchOpenArticle = async (slug) => {
  const res = await fetch(`https://conduit.productionready.io/api/articles/${slug}`);

  if (!res.ok) {
    throw new Error(`Could not fetch!!! recived status: ${res.status}`);
  }

  return res.json();
};

const fetchLogIn = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: { email: data.email, password: data.password } }),
  });

  return request.json();
};

const fetchCookie = async (token) => {
  const request = await fetch(`https://conduit.productionready.io/api/user`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  return request.json();
};

const fetchEditProfile = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/user`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({ user: { email: data.email, password: data.password, username: data.username } }),
  });

  return request.json();
};

const fetchNewArticle = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/articles`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      article: { title: data.title, description: data.description, body: data.text, tagList: data.tagList },
    }),
  });

  return request.json();
};

const fetchUpdateArticle = async (data) => {
  const request = await fetch(`https://conduit.productionready.io/api/articles/${data.slug}`, {
    method: 'PUT',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      article: { title: data.title, description: data.description, body: data.text, tagList: data.tagList },
    }),
  });

  return request.json();
};

const fetchDeleteArticle = async (slug) => {
  const request = await fetch(`https://conduit.productionready.io/api/articles/${slug}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return request.json();
};

const fetchLike = async (slug) => {
  const request = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
    method: 'POST',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return request.json();
};

const fetchDislike = async (slug) => {
  const request = await fetch(`https://conduit.productionready.io/api/articles/${slug}/favorite`, {
    method: 'DELETE',
    headers: {
      Authorization: `Token ${document.cookie}`,
      'Content-Type': 'application/json;charset=utf-8',
    },
  });

  return request.json();
};

export {
  fetchRegistration,
  fetchLogIn,
  fetchOpenArticle,
  fetchCookie,
  fetchEditProfile,
  fetchNewArticle,
  fetchArticlesList,
  fetchUpdateArticle,
  fetchDeleteArticle,
  fetchLike,
  fetchDislike,
};
