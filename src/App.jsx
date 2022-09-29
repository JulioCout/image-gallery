import { useState } from "react"

import "./styles/global.scss"
import './App.scss';

export default function App() {

  const [images, setImages] = useState([])
  const [inputValue, setInputValue] = useState([])
  const [page, setPage] = useState(2)



    function handleImageSearch(){
      const fetchImages = async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos/?query=${inputValue}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        const data = await response.json()
        setImages(data.results)
        setPage(2)
      }
      
      fetchImages()
    }

    function handleAddImages(){
      const fetchImagesToAdd = async () => {
        let response2 = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${inputValue}&client_id=${process.env.REACT_APP_UNSPLASH_API_KEY}`)
        let data2 = await response2.json()

        console.log(data2.results)

        setImages(prevState => [...prevState, ...data2.results])
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
            <img loading="lazy" key={image.id} src={image.urls.full} />
        ))}
      </div>

      <footer>
        <button className={images.length == 0 ? "hide" : "none"} onClick={handleAddImages}>Mostrar Mais</button>
      </footer>

    </div>
  )
}