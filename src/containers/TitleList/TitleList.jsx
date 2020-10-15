/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-shadow */

import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import Title from '../../components/Title/Title';
import Spinner from '../../components/Spinner/Spinner';

import { getArticles, toggleLike } from '../../actions/articleActions';

import 'antd/dist/antd.css';

const TitleList = ({ getArticles, toggleLike, articles, status: { isLoading }, loggedUser: { user } }) => {
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    getArticles();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (e) => {
    getArticles(e - 1);
    setPage(e);
  };

  const likeIt = (slug) => {
    if (!user.username) return;
    const likeCount = articles.filter((item) => (item.slug === slug ? item : null))[0].favoritesCount;
    toggleLike({ slug, likeCount });
  };

  const isActive = !user.username ? 'inactive' : null

  const elements = !isLoading ? (
    articles.map((item) => <Title data={item} key={item.slug} likeIt={likeIt} isActive={isActive}/>)
  ) : (
    <Spinner />
  );

  return (
    <div>
      <div className="content">{elements}</div>
      <Pagination
        current={currentPage}
        size="small"
        total={500}
        showSizeChanger={false}
        pageSize={5}
        onChange={(e) => changePage(e)}
      />
    </div>
  );
};

TitleList.defaultProps = {
  isLoading: false,
  user: '',
}

TitleList.propTypes = {
  getArticles: PropTypes.func.isRequired,
  toggleLike: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
  user: PropTypes.string,
  status: PropTypes.object.isRequired,
  loggedUser: PropTypes.object.isRequired,

};


const mapStateToProps = (state) => {
  return {
    status: {
      isLoading: state.status.isLoading,
    },
    loggedUser: {
      user: state.loggedUser.user,
    },
    articles: state.articles,
  };
};

const mapDispatchToProps = {
  getArticles,
  toggleLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleList);
