import React from 'react';

const Todo = ({ deleteTask, todo, tags }) => {
  const elements = todo.map((item, i) => (
    <div className="new-article__container" key={item.id}>
      <input type="text" placeholder="Enter new tag" name="tag" value={item.tag || tags[i]} readOnly />
      <button type="button" className="todo__button todo__button-del" onClick={() => deleteTask(item.id)}>
        Delete
      </button>
    </div>
  ));

  return elements;
};

export default Todo;
