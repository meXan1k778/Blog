/* eslint-disable react/prop-types */
import React from 'react';

import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import icon from '../../img/Vector.png';

import './title.scss';

const Title = ({ data, likeIt }) => {
  const {
    title,
    body,
    tagList,
    updatedAt,
    slug,
    favoritesCount,
    author: { username, image },
  } = data;
  const tags = tagList.map((item) => (
    <span className="content__tag" key={item}>
      {item}
    </span>
  ));
  const date = format(new Date(updatedAt), 'MMMM dd, yyyy');

  return (
    <div className="content__block">
      <div className="content__description">
        <Link className="content__title" to={`/article/${slug}`}>
          {title}
        </Link>
        <button className="like" type="button" onClick={() => likeIt(slug)}>
          <img src={icon} alt="qwe" />
          {favoritesCount}
        </button>
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
  );
};

export default Title;
