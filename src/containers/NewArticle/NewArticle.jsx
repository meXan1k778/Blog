/* eslint-disable react/forbid-prop-types */

/* eslint-disable no-shadow */
import React, { useState, useRef } from 'react';

import { Redirect, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import NewArticleForm from '../../components/NewArticleForm/NewArticleForm'

import { createArticle, updateArticle } from '../../actions/articleActions';


const NewArticle = ({ createArticle, updateArticle, status: { fetchSucces }, match, articles }) => {
  const currentArticle = articles.length !== 0 ? articles.filter((item) => item.slug === match.params.slug)[0] : [];

  const title = currentArticle ? currentArticle.title : null;
  const description = currentArticle ? currentArticle.description : null;
  const body = currentArticle ? currentArticle.body : null;
  const tagList = currentArticle ? currentArticle.tagList : [];
  const localTitle = match.params.slug ? <h3>Edit article</h3> : <h3>Create new article</h3>

  const tagId = useRef(0);

  // eslint-disable-next-line no-use-before-define
  const currentTags = tagList ? tagList.map((item) => createItem(item)) : [];

  
  const [mainInput, setInput] = useState('');
  const [todo, setTodo] = useState(currentTags || []);

  function createItem(text) {
    return {
      tag: text,
      id: tagId.current++,
    };
  }

  function addTask(text) {
    if (text.trim().length === 0) return;
    setInput('');

    setTodo(() => [...todo, createItem(text)]);
  }

  function deleteTask(id) {
    setTodo(() => todo.filter((item) => (item.id !== id ? item : null)));
  }

  function onInputChange(event) {
    setInput(event.target.value);
  }
 
  const onSubmit = (data) => {
    const tagList = todo.map((item) => Object.values(item)[0]);
    
    if (match.params.slug) {
      updateArticle({ ...data, tagList, slug: match.params.slug });
    } else {
      createArticle({ ...data, tagList });
    }
  };

  if (fetchSucces) {
    return <Redirect to="/" />;
  }

  return <NewArticleForm 
  data={[title, description, body, localTitle, mainInput, todo, tagList]}
  addTask={addTask} 
  deleteTask={deleteTask}
  onInputChange={onInputChange}
  onSubmit={onSubmit}
  />
};

NewArticle.defaultProps = {
  match: {},
  articles: [],
  status: {},
  fetchSucces: false,
}

NewArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  updateArticle: PropTypes.func.isRequired,
  match: PropTypes.object,
  articles: PropTypes.array,
  status: PropTypes.object,
  fetchSucces: PropTypes.bool,
}

const mapStateToPops = (state) => {
  return {
    articles: state.articles,
    status: {
      fetchSucces: state.status.fetchSucces,
    },
  };
};

const mapDispatchToProps = {
  createArticle,
  updateArticle,
};

export default withRouter(connect(mapStateToPops, mapDispatchToProps)(NewArticle));
