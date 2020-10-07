/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import StoreApi from '../../StoreTitles/Storeservice';

import { deleteArticle } from '../../actions/actions';
import Spinner from '../Spinner/Spinner';
import Modal from './Modal';
import './article.scss';

const streApi = new StoreApi();

const Article = ({ match, loggedUser, deleteArticle }) => {
  const [isDeleted, setDelete] = useState(false);
  const [statusModal, setModal] = useState(false);
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

  const actionArticle = () => {
    deleteArticle(slug);
    setDelete(true);
  };

  const toggleModal = (value) => {
    setModal(value);
  };

  const date = format(new Date(updatedAt), 'MMMM dd, yyyy');

  const userBtn = username !== loggedUser.username || (
    <>
      <Link to={`/article/${slug}/edit`} className="content__btn content__btn-edit ">
        Edit
      </Link>
      <button onClick={() => toggleModal(true)} type="button" className="content__btn content__btn-remove">
        Delete
      </button>
    </>
  );

  const modal = !statusModal || <Modal toggleModal={toggleModal} actionArticle={actionArticle} />;

  if (isDeleted) {
    return <Redirect to="/" />;
  }

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
          {modal}
        </div>
        {userBtn}
      </div>
    </div>
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
  };
};

const mapDispatchToProps = {
  deleteArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
