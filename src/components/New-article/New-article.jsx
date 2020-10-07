import React, { useState, useRef, useEffect } from 'react';

import { Redirect, withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { connect } from 'react-redux';

import Todo from './Todo';
import { createArticle, updateArticle } from '../../actions/actions';

import './new-article.scss';

const NewArticle = ({ createArticle, updateArticle, articles, match }) => {
  const currentArticle = articles.length !== 0 ? articles.filter((item) => item.slug === match.params.slug)[0] : {};

  const title = currentArticle ? currentArticle.title : null;
  const description = currentArticle ? currentArticle.description : null;
  const body = currentArticle ? currentArticle.body : null;
  const tagList = currentArticle ? currentArticle.tagList : [];

  const tagId = useRef(0);

  const currentTags = tagList ? tagList.map((item) => createItem(item)) : null;

  const [isDone, setDone] = useState(false);
  const { register, handleSubmit, errors } = useForm();
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
    }
    createArticle({ ...data, tagList });
    return setDone(true);
  };

  if (isDone) {
    return <Redirect to="/" />;
  }

  return (
    <form action="" method="POST" onSubmit={handleSubmit(onSubmit)}>
      <div className="content__new-article">
        <h3>Create new article</h3>

        <label htmlFor="username">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          defaultValue={title}
          name="title"
          ref={register({ required: true })}
        />
        {errors.title && errors.title.type === 'required' && <p>this is required</p>}
        {errors.title && errors.title.type === 'minLength' && <p>minimal length 3 symbols</p>}

        <label htmlFor="email">Short description</label>
        <input
          type="text"
          placeholder="Enter description"
          defaultValue={description}
          name="description"
          ref={register({ required: true })}
        />
        {errors.description && errors.description.type === 'required' && <p>this is required</p>}

        <label htmlFor="password">Text</label>
        <textarea type="text" placeholder="Text" defaultValue={body} name="text" ref={register({ required: true })} />
        <label htmlFor="avatar">Tags</label>

        <div className="new-article__todo">
          <Todo deleteTask={deleteTask} todo={todo} tags={tagList} />
          <div className="new-article__container">
            <input
              type="text"
              placeholder="Enter new tag"
              name="tag"
              value={mainInput}
              onChange={(event) => onInputChange(event)}
            />
            <button type="button" className="todo__button todo__button-del">
              Delete
            </button>
          </div>

          <button type="button" className="todo__button todo__button-add" onClick={() => addTask(mainInput)}>
            Add tag
          </button>
        </div>

        <button className="regform-btn" type="submit">
          Send
        </button>
      </div>
    </form>
  );
};

const mapStateToPops = (state) => {
  return {
    articles: state.articles,
  };
};

const mapDispatchToProps = {
  createArticle,
  updateArticle,
};

export default withRouter(connect(mapStateToPops, mapDispatchToProps)(NewArticle));
