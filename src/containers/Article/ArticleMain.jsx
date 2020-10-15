/* eslint-disable react/no-array-index-key */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';

import { format } from 'date-fns';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Article from '../../components/Article/Article';
import Modal from '../../components/Modal/Modal';
import Spinner from '../../components/Spinner/Spinner';

import { deleteArticle, getFullArticle, toggleLike } from '../../actions/articleActions';

const ArticleMain = ({
  match,
  deleteArticle,
  getFullArticle,
  currentArticle,
  toggleLike,
  status: { isLoading, fetchSucces },
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
 
  const tags = tagList.map((item, i) => (
    <span className="content__tag" key={i}>
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
  const isActive = !user.username ? 'inactive' : null

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

  if (fetchSucces) {
    return <Redirect to="/" />;
  }

  return !isLoading ? (
    <Article data={currentArticle} calculatedData={[date, tags, userBtn, modal, isActive]} likeIt={likeIt} />
  ) : (
    <Spinner />
  );
};

ArticleMain.defaultProps = {
  match: {},
  status: {},
  isLoading: false,
  fetchSucces: false,
  loggedUser: {},
  user: {},
  currentArticle: {},
}

ArticleMain.propTypes = {
  match: PropTypes.object,
  deleteArticle: PropTypes.func.isRequired,
  getFullArticle: PropTypes.func.isRequired,
  currentArticle: PropTypes.object,
  toggleLike: PropTypes.func.isRequired,
  status: PropTypes.object,
  isLoading: PropTypes.bool,
  fetchSucces: PropTypes.bool,
  loggedUser: PropTypes.object,
  user: PropTypes.object,
}

const mapStateToProps = (state) => {
  return {
    status: {
      isLoading: state.status.isLoading,
      fetchSucces: state.status.fetchSucces,
    },
    loggedUser: {
      user: state.loggedUser.user,
    },
    currentArticle: state.currentArticle,
  };
};

const mapDispatchToProps = {
  deleteArticle,
  getFullArticle,
  toggleLike
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleMain);
