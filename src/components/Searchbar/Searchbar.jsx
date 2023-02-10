import { useState } from "react";
import css from './Searchbar.module.css';
import PropTypes from 'prop-types';


export const Searchbar = ({onSubmit}) => {
  const [filter,setFilter] = useState("");

  const onChange = (evt) => {      
    setFilter(evt.target.value); 
  }  

  const onSubmitSearchForm = (evt) =>{
      evt.preventDefault();                 
      onSubmit(filter);
   }
  
  return (
      <header className={css.searchbar}>
          <form onSubmit={onSubmitSearchForm} className={css.searchForm}>
            <button type="submit" className={css.searchFormButton}>
              <span className={css.searchFormButtonLabel}>Search</span>
            </button>
            <input 
              onChange={onChange}                 
              name="searchQuery"
              className={css.searchFormInput}
              value={filter}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
            />
          </form>
      </header>
  )     
}

Searchbar.propTypes = {onSubmit: PropTypes.func};