import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import { connect } from 'react-redux';
import Title from '../Title/Title';
import { getArticles } from '../../actions/actions';

import 'antd/dist/antd.css';

const TitleList = ({ getArticles, articles, isLoading }) => {
  const [currentPage, setPage] = useState(1);

  useEffect(() => {
    getArticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (e) => {
    getArticles(e);
    setPage(e);
  };

  const elements = !isLoading ? articles.map((item) => <Title data={item} key={item.slug} />) : 'loading...';

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
  };
};

const mapDispatchToProps = {
  getArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(TitleList);
