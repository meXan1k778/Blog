/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import StoreApi from '../../StoreTitles/Storeservice';
import './article.scss';

const streApi = new StoreApi();

const Article = ({ match, loggedUser }) => {
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
    slug,
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

  const userBtn = username !== loggedUser.username || (
    <>
      <Link to={`/article/${slug}/edit`} className="content__btn content__btn-edit ">
        Edit
      </Link>
      <button type="button" className="content__btn content__btn-remove">
        Delete
      </button>
    </>
  );

  return isLoaded ? (
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
        </div>
        {userBtn}
      </div>
    </div>
  ) : (
    <div>loading page...</div>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
  };
};

export default connect(mapStateToProps, null)(Article);
