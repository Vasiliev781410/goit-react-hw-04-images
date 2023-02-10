import css from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from "react";

export const Modal = ({largeImageURL, setModalOpenStatus}) => { 

  useEffect (() =>{
      document.addEventListener("keydown", handleClick); 
      
      return () => {
        document.removeEventListener("keydown", handleClick);
      };
    }
  ,[]);

  const handleClick = (e) => {             
    if (e.code === "Escape") {      
        setModalOpenStatus();  
    };
  };  
  const closeModalOnOverlay = (e) => {         
    if (e.target === e.currentTarget  ) {      
        setModalOpenStatus();  
    };
  };                                                                    

  return (
      <div onClick={closeModalOnOverlay} className={css.overlay}>
          <div className={css.modal}>
            <img className={css.largeImage} src={largeImageURL} alt="" />
          </div>
    </div>                 
  )
  
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  setModalOpenStatus: PropTypes.func,
};