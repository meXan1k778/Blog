/* eslint-disable react/forbid-prop-types */

import React from 'react';

import { format } from 'date-fns';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import icon from '../../img/Vector.png';
import cutText from '../../utils/utils'

import './title.scss';

const Title = ({ data, likeIt, isActive }) => {
  const {
    title,
    body,
    tagList,
    updatedAt,
    slug,
    favoritesCount,
    author: { username, image },
  } = data;
  const tags = tagList.map((item) => (
    <span className="content__tag" key={item}>
      {item}
    </span>
  ));
  const date = format(new Date(updatedAt), 'MMMM dd, yyyy');

  return (
    <div className="content__block">
      <div className="content__description">
        <Link className="content__title" to={`/article/${slug}`}>
          {title}
        </Link>
        <button className={`like ${isActive}`} type="button" onClick={() => likeIt(slug)}>
          <img src={icon} alt="qwe" />
          {favoritesCount}
        </button>
        <div>{tags}</div>
        <p>{cutText(body)}</p>
      </div>
      <div className="content__owner">
        <div className="content__data">
          <p className="content__name">{username}</p>
          <span className="content__date">{date}</span>
        </div>

        <img src={image} alt="avatar" />
      </div>
    </div>
  );
};

Title.defaultProps = {
  isActive: '',
  title: '',
  body: '',
  tagList: [],
  updatedAt: '',
  slug: '',
  favoritesCount: 0,
  data: {},
}

Title.propTypes = {
  isActive: PropTypes.string,
  title: PropTypes.string,
  body: PropTypes.string,
  tagList: PropTypes.array,
  updatedAt: PropTypes.string,
  slug: PropTypes.string,
  favoritesCount: PropTypes.number,
  data: PropTypes.object,
  likeIt: PropTypes.func.isRequired,
}

export default Title;
