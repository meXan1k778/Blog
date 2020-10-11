/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import ArticleRender from './ArticleRender';
import Modal from './Modal';
import Spinner from '../Spinner/Spinner';

import { deleteArticle, getFullArticle, toggleLike } from '../../actions/actions';

import './article.scss';

const Article = ({
  match,
  deleteArticle,
  getFullArticle,
  currentArticle,
  toggleLike,
  Status: { isLoading, userRegistered },
  loggedUser: { user },
}) => {
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

  const likeIt = (slug) => {
    if (!user.username) return;
    const likeCount = currentArticle.favoritesCount;
    toggleLike({ slug, likeCount });
  };

  const actionArticleDel = () => {
    deleteArticle(slug);
  };

  const toggleModal = (value) => {
    setModal(value);
  };

  const date = format(new Date(updatedAt), 'MMMM dd, yyyy');

  const userBtn = username !== user.username || (
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

  if (userRegistered) {
    return <Redirect to="/" />;
  }

  return !isLoading ? (
    <ArticleRender data={currentArticle} calculatedData={[date, tags, userBtn, modal, likeIt]} />
  ) : (
    <Spinner />
  );
};

Article.defaultProps = {
  match: {},
  Status: {},
  isLoading: false,
  userRegistered: {},
  loggedUser: {},
  user: {},
  currentArticle: {},
}

Article.propTypes = {
  match: PropTypes.object,
  deleteArticle: PropTypes.func.isRequired,
  getFullArticle: PropTypes.func.isRequired,
  currentArticle: PropTypes.object,
  toggleLike: PropTypes.func.isRequired,
  Status: PropTypes.object,
  isLoading: PropTypes.bool,
  userRegistered: PropTypes.object,
  loggedUser: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    Status: {
      isLoading: state.Status.isLoading,
      userRegistered: state.Status.userRegistered,
    },
    loggedUser: {
      user: state.loggedUser.user,
    },
    currentArticle: state.CurrentArticle,
  };
};

const mapDispatchToProps = {
  deleteArticle,
  getFullArticle,
  toggleLike
};

export default connect(mapStateToProps, mapDispatchToProps)(Article);
