/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';

import './tags.scss'

const Todo = ({ deleteTask, todo, tags }) => {
  const elements = todo.map((item, i) => (
    <div className="new-article__container" key={item.id}>
      <span onClick={() => deleteTask(item.id)} className="tags">{item.tag || tags[i]}</span>
    </div>
  ));

  return elements;
};

export default Todo;
