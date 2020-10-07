import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Title from '../Title/Title';
import { getArticles, toggleLike } from '../../actions/actions';
import Spinner from '../Spinner/Spinner';

import 'antd/dist/antd.css';

const TitleList = ({ getArticles, articles, isLoading, toggleLike, loggedUser }) => {
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (e) => {
    getArticles(e);
    setPage(e);
  };

  const likeIt = (slug) => {
    if (!loggedUser.username) return;
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
    articles: state.articles,
    isLoading: state.isLoading,
    loggedUser: state.loggedUser,
  };
};

const mapDispatchToProps = {
  getArticles,
  toggleLike,
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleList);
