/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import StoreApi from '../../StoreTitles/Storeservice';

const streApi = new StoreApi();

const Article = ({ match }) => {
  const [data, setData] = useState({
    author: { username: '', image: '' },
    body: '',
    tagList: [],
    title: '',
    updatedAt: new Date(),
    isLoaded: false,
  });
  const {
    title,
    body,
    tagList,
    isLoaded,
    updatedAt,
    author: { username, image },
  } = data;

  useEffect(() => {
    streApi.openArticle(match.params.slug).then((res) => setData({ ...res.article, isLoaded: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tags = tagList.map((item) => (
    <span className="content__tag" key={item[0]}>
      {item}
    </span>
  ));

  const date = format(new Date(updatedAt), 'MMMM dd, yyyy');

  return isLoaded ? (
    <div className="content__block">
      <div className="content__description">
        <h3>{title}</h3>
        <div>{tags}</div>
        <p>{body}</p>
      </div>
      <div className="content__owner">
        <div>
          <span className="content__name">{username}</span>
          <span className="content__date">{date}</span>
        </div>

        <img src={image} alt="avatar" />
      </div>
    </div>
  ) : (
    <div>loading page...</div>
  );
};

export default Article;
