import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';
import Title from '../Title/Title';

import 'antd/dist/antd.css';

import StoreApi from '../../StoreTitles/Storeservice';

const TitleList = () => {
  const titlesApi = new StoreApi();

  const [currentPage, setPage] = useState(1);
  const [isLoaded, setLoader] = useState(false);

  const [articles, setArticles] = useState([]);

  useEffect(() => {
    titlesApi
      .getArticles()
      .then((res) => setArticles(res.articles))
      .then(() => setLoader(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changePage = (e) => {
    setLoader(false);
    titlesApi
      .getArticles(e)
      .then((res) => setArticles(res.articles))
      .then(() => setLoader(true));
    setPage(e);
  };

  const elements = isLoaded ? articles.map((item) => <Title data={item} key={item.slug} />) : 'loading...';

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

export default TitleList;
