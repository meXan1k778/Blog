/* eslint-disable react/prop-types */
import React from 'react';

const ArticleRender = ({
  data: {
    title,
    body,
    author: { username, image },
  },
  calculatedData: [date, tags, userBtn, modal],
}) => {
  return (
    <div className="content__block article">
      <div className="content__description">
        <h3>{title}</h3>
        <div>{tags}</div>
        <p>{body}</p>
      </div>
      <div className="content__bar">
        <div className="content__owner">
          <div>
            <span className="content__name">{username}</span>
            <span className="content__date">{date}</span>
          </div>
          <img src={image} alt="avatar" />
          {modal}
        </div>
        {userBtn}
      </div>
    </div>
  );
};

export default ArticleRender;
