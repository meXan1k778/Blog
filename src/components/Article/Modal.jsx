import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ toggleModal, actionArticle }) => {
  return (
    <div className="modal-window">
      <p className="modal__warn-msg">Are you sure to delete this article?</p>
      <div className="modal__btns">
        <button onClick={() => actionArticle()} type="button" className="content__btn content__btn-confirm">
          Yes
        </button>
        <button onClick={() => toggleModal(false)} type="button" className="content__btn content__btn-reject">
          No
        </button>
      </div>
    </div>
  );
};

Modal.propTypes ={
  toggleModal: PropTypes.func.isRequired, 
  actionArticle: PropTypes.func.isRequired,
}

export default Modal;
