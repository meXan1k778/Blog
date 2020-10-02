import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Title from '../Title/Title';
import Header from '../Header/Header';

import 'antd/dist/antd.css';

import StoreApi from '../../StoreTitles/Storeservice';

const TitleList = () => {
  const titlesApi = new StoreApi();

  const [currentPage, setPage] = useState(1);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    titlesApi.getArticles().then((res) => setArticles(res.articles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (e) => {
    titlesApi.getArticles(e).then((res) => setArticles(res.articles));
    setPage(e);
  };

  const elements = articles.map((item) => <Title data={item} key={item.slug} />);

  return (
    <div>
      <Header />
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

export default TitleList;
