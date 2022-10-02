import { useState, useEffect } from "react"

import "./styles/global.scss"
import './App.scss';

export default function App() {

  const [images, setImages] = useState([])
  const [inputValue, setInputValue] = useState([])
  const [page, setPage] = useState(2)
  const [addButtonClass, setAddButtonClass] = useState("hide")

    useEffect(() => {
      const fetchImages = async () => {
        const response = await fetch(
          `https://api.unsplash.com/photos?client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        const data = await response.json()
        setImages(data)
      }
      fetchImages()
    }, [])

    function handleImageSearch(){
      const  fetchImages =  async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos/?query=${inputValue}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        const data = await response.json()
        setImages(data.results)
        console.log(images)
        setPage(2)
        setAddButtonClass("")
      }
      fetchImages()
    }

    function handleAddImages(){
      const fetchImagesToAdd = async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        const data = await response.json()
        setImages(prevState => [...prevState, ...data.results])
        console.log(images)
        setPage(page + 1)
      }
      fetchImagesToAdd()
    }


  return (
    <div className="App">
      
      <header className="App-header">

        <div className="search">
          <h1>Galeria de Imagem com API do Unsplash</h1>
          
          <div className="search-input">
            <input type="text" placeholder="Buscar Imagem" onChange={e => setInputValue(e.target.value)} />
            <button type="submit" onClick={handleImageSearch}>Buscar</button>
          </div>

        </div>

      </header>

      <div className="images-wrapper">
        {images.map((image) => (
            <img loading="lazy" key={image.id} src={image.urls.full} alt={image.alt_description}/>
        ))}
      </div>

      <div className="addButton-section">
        <button className={addButtonClass} onClick={handleAddImages}>Mostrar Mais</button>
      </div>

      <footer>
        <p>Feito por <a href="https://www.juliocoutinho.dev" target="_blank" rel="noreferrer">Julio Coutinho</a></p>
      </footer>

    </div>
  )
}