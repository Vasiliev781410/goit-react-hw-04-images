import { useState, useEffect } from "react";
import { Searchbar } from "components/Searchbar/Searchbar.jsx";
import { ImageGallery } from "components/ImageGallery/ImageGallery.jsx";
import { Button } from "components/Button/Button.jsx";
import { Loader } from "components/Loader/Loader.jsx";
import { Modal } from "components/Modal/Modal.jsx";
import Notiflix from 'notiflix';
import {getDataFromApi}  from '../../api/api.js';

export const ImageSearch = ()=>{
    const [images,setImages] = useState([]);
    const [page,setPage] = useState(0);    
    const [loadHits,setLoadHits] = useState(0);
    const [isLoading,setIsLoading] = useState(false);
    const [visibleButton,setVisibleButton] = useState(false);
    const [showModal,setShowModal] = useState(false);
    const [filter,setFilter] = useState("");   
    const [largeImageURL,setLargeImageURL] = useState("");
    
    const fetchData = async () => {
        try {
            const response = await getDataFromApi(filter, page);
            const {totalHits, hits} = response;
            setImages([...images, ...hits]); 
            let endSearch = false; 
            let sumLoadHits = 0;                   
            if (hits.length > 0) { 
                sumLoadHits = loadHits + hits.length;                                            
                if (sumLoadHits  === totalHits) { 
                    endSearch = true;         
                    Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");   
               }                          
            } else{
                if (page > 0) { 
                    Notiflix.Notify.failure('Oops, there is no images with that name'); 
                }                
            }           
            hits.length > 0 &&  endSearch === false ?  setVisibleButton(true) : setVisibleButton(false);                 
            setLoadHits(sumLoadHits); 
        }
        catch (error) {  
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');           
            setIsLoading(false); 
            setLoadHits(0); 
            setVisibleButton(false);                 
        };  
    }

    useEffect(() => {         
        setIsLoading(true); 
        fetchData();                              
        setIsLoading(false);  
        smoothScroll(page);                                     
        }         
    ,[filter,page]);
   
    function smoothScroll(page){
        try{
            if (page > 1){
                    window.scrollBy({
                    top: window.innerHeight * page,
                    behavior: "smooth",    
                });                       
            };                 
        }
        catch (error){}
    }
    const onClickImage = (largeImage) => {       
        setShowModal(true); 
        setLargeImageURL(largeImage);       
    } 
    const setModalCloseOpenStatus = () => {         
        setShowModal(!showModal);        
    }                     
    const onSubmitSearchForm = (filterForm) =>{                       
        setFilter(filterForm); 
        setLoadHits(0); 
        setPage(1); 
        setImages([]);    
    }
    const loadMore = () => {       
        setPage(page+1); 
    }
                           
    return (
        <>
            <Searchbar onSubmit={onSubmitSearchForm} page={page}/>   
            {images.length > 0 ? <ImageGallery images={images} onClickImage={onClickImage}/>: <></>}  
            {isLoading ? <Loader/> : visibleButton === true ? <Button onLoadMore={loadMore} title="Load more"/>: <></>}  
            {showModal && <Modal largeImageURL={largeImageURL} setModalOpenStatus={setModalCloseOpenStatus}/>}   
        </>        
    )    
}

