/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import ArticleRender from './ArticleRender';
import Modal from './Modal';
import Spinner from '../Spinner/Spinner';

import { deleteArticle, getFullArticle } from '../../actions/actions';

import './article.scss';

const Article = ({ match, loggedUser, deleteArticle, getFullArticle, currentArticle, isLoading }) => {
  const [isDeleted, setDelete] = useState(false);
  const [statusModal, setModal] = useState(false);

  const {
    tagList,
    slug,
    updatedAt,
    author: { username },
  } = currentArticle;

  useEffect(() => {
    getFullArticle(match.params.slug);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tags = tagList.map((item) => (
    <span className="content__tag" key={item[0]}>
      {item}
    </span>
  ));

  const actionArticleDel = () => {
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

  const modal = !statusModal || <Modal toggleModal={toggleModal} actionArticle={actionArticleDel} />;

  if (isDeleted) {
    return <Redirect to="/" />;
  }

  return !isLoading ? (
    <ArticleRender data={currentArticle} calculatedData={[date, tags, userBtn, modal]} />
  ) : (
    <Spinner />
  );
};

const mapStateToProps = (state) => {
  return {
    loggedUser: state.loggedUser,
    currentArticle: state.currentArticle,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = {
  deleteArticle,
  getFullArticle,
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
