/* eslint-disable react/prop-types */
import React from 'react';

import { format } from 'date-fns';

import './title.scss';

const Title = ({ data }) => {
  const {
    title,
    body,
    tagList,
    updatedAt,
    author: { username, image },
  } = data;
  const tags = tagList.map((item) => (
    <span className="content__tag" key={item[0]}>
      {item}
    </span>
  ));
  const date = format(new Date(updatedAt), 'MMMM dd, yyyy');

  return (
    <div className="content__block">
      <div className="content__description">
        <h3>{title}</h3>
        <div>{tags}</div>
        <p>{body}</p>
      </div>
      <div className="content__owner">
        <img src={image} alt="avatar" />
        <span className="content__name">{username}</span>
        <span className="content__date">{date}</span>
      </div>
    </div>
  );
};

export default Title;
