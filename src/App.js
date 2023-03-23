import React, { useState, useEffect, useRef } from 'react'
import { FaSearch } from 'react-icons/fa'
import Photo from './Photo'
const clientID = `?client_id=${process.env.REACT_APP_ACCESS_KEY}`

const mainUrl = `https://api.unsplash.com/photos/`
const searchUrl = `https://api.unsplash.com/search/photos/`




function App() {
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [query,setQuery] = useState('');
  const [newImages, setNewImages] = useState(false)

  const searchValue = React.useRef('');
  const mounted = useRef(false)

  const fetchPhotos = async () => {
  setLoading(true);
  let url;
  const urlPage = `&page=${page}`;
  const queryPage = `&query=${query}`;

    if(query){
      url = `${searchUrl}${clientID}${urlPage}${queryPage}`;
    } else {
      url = `${mainUrl}${clientID}${urlPage}`;
    }

    try {
      const response = await fetch(url)
      const data = await response.json();

      console.log(data)

       setPhotos((oldPhotos) => {
          if(query && page === 1){
            return data.results
          }
          else if(query){
            return [...oldPhotos, ...data.results]
          } else {
            return [...oldPhotos, ...data]
          }

       });
       setNewImages(false);
       setLoading(false);

    } catch(error){
      setNewImages(false);
      setLoading(false);
    }
  }

  // First useEffect to get the images
  useEffect(() => {
    fetchPhotos() 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);


// Second useEffect 
 useEffect(() =>{
  if(!mounted.current){
    mounted.current = true
    return;
  }
  if(!newImages) return;
  if(loading) return;
  setPage((oldPage) => oldPage + 1)
 }, [newImages]);

 const event = () => {
    if(window.innerHeight + window.scrollY >= document.body.scrollHeight - 2){
        setNewImages(true);
    }
 }

 //Third UseEffect
 useEffect(() => {
  window.addEventListener('scroll',event)
  return () => window.removeEventListener('scroll', event)
 }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!query) return;
    if(page === 1){
      fetchPhotos();
    }
    setPage(1);
  }
  return(
    <main>
      <section className="search">
        <form className="search-form">
          <input type="text" value={query} className="form-input" ref={searchValue} placeholder='Search' onChange={(e) => setQuery(e.target.value) } />
          <button type="submit" className="btn submit-btn" onClick={handleSubmit}><FaSearch /></button>
        </form>
      </section>

      <section className="photos">
        <div className="photos-center">
          { photos.map((photo, index) => {
            return (
            <Photo {...photo} key={index} />
            )
          })}
       </div>
       {loading && <h1 className="loading">Loading...</h1>}
      </section>
    </main>
  )
}

export default App
