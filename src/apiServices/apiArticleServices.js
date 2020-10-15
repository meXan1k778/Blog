const fetchArticlesList = async (page = 0) => {
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

    if (!request.ok) {
      throw new Error(`Could not fetch!!! recived status: ${request.status}`);
    }
  
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

    if (!request.ok) {
      throw new Error(`Could not fetch!!! recived status: ${request.status}`);
    }
  
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

    if (!request.ok) {
      throw new Error(`Could not fetch!!! recived status: ${request.status}`);
    }
  
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

    if (!request.ok) {
      throw new Error(`Could not fetch!!! recived status: ${request.status}`);
    }
  
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

    if (!request.ok) {
      throw new Error(`Could not fetch!!! recived status: ${request.status}`);
    }
  
    return request.json();
  };

  export {
    fetchOpenArticle,
    fetchNewArticle,
    fetchArticlesList,
    fetchUpdateArticle,
    fetchDeleteArticle,
    fetchLike,
    fetchDislike,
  };