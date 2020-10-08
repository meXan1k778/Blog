/* eslint-disable no-shadow */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';

import Title from '../Title/Title';
import Spinner from '../Spinner/Spinner';

import { getArticles, toggleLike } from '../../actions/actions';

import 'antd/dist/antd.css';

const TitleList = ({ getArticles, toggleLike, articles, Status: { isLoading }, loggedUser: { user } }) => {
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

  const elements = !isLoading ? (
    articles.map((item) => <Title data={item} key={item.slug} likeIt={likeIt} />)
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

const mapStateToProps = (state) => {
  return {
    Status: {
      isLoading: state.Status.isLoading,
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
