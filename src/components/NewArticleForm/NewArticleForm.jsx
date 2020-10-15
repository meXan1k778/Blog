/* eslint-disable react/prop-types */
import React from 'react';
import { useForm } from 'react-hook-form';
import Todo from "../Todo/Todo";

import './newArticle.scss';

const NewArticleForm = ({data, addTask, deleteTask, onInputChange, onSubmit}) => {
  const [title, description, body, localTitle, mainInput, todo, tagList] = data
    const { register, handleSubmit, errors } = useForm();

    const addNewTag = (e) =>{
      if(e.keyCode === 13) {
        addTask(mainInput)
      }
      
    }

    return (
        
          <div className="content__new-article">
            <form action="" id="data" method="POST" onSubmit={handleSubmit(onSubmit)}>
            {localTitle}
    
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
            <label htmlFor="avatar">Tags:</label>
            </form>
            <Todo deleteTask={deleteTask} todo={todo} tags={tagList} />
            
            <div className="new-article__todo">
              
              <div className="new-article__container">
             
                <input
                  type="text"
                  placeholder="Enter new tag"
                  name="tag"
                  value={mainInput}
                  onKeyDown={(e) => addNewTag(e)}
                  onChange={(event) => onInputChange(event)}
                />

              </div>
    
              <button type="button" className="todo__button todo__button-add" onClick={() => addTask(mainInput)}>
                Add tag
              </button>
            </div>
    
            <button form="data" className="regform-btn" type="submit">
              Send
            </button>
            
          </div>
        
      );
}

export default NewArticleForm