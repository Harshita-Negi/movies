import { useEffect, useState } from "react";
import './App.css'
import SearchIcon from "./search.svg"
import MovieCard from "./MovieCard"

const API_URL = process.env.REACT_APP_URL

const App = ()=>{
    
    const[movies, setMovies] = useState([]);
    const[searchTerm, setsearchTerm] = useState("");

    const searchMovies = async(title)=>{
      const response = await fetch(`${API_URL}&s=${title}`)
      const data = await response.json()
      setMovies(data.Search);
    //   console.log(data.Search);
    }

    useEffect(()=>{ 
       searchMovies("Avengers");
    }, [])

    return (
        <div className="app">
             <h1>Movies</h1> 

             <div className="search">
               <input 
                 placeholder="Enter movie to watch"
                 value={searchTerm}
                 onChange={(e)=>setsearchTerm(e.target.value)}
               />

               <img 
                className="searchIcon"
                src={SearchIcon}
                alt="Search Image"
                onClick={()=>searchMovies(searchTerm)}
               />
             </div>

             {
                movies?.length > 0 ? 
                  (
                    <div className="container">
                        {
                            movies.map((movie)=>(
                              <MovieCard props = {movie}/>
                            ))
                        }
                    </div>

                  ) : 
                  (
                    <div className="empty">
                      <h2> No Movies Found</h2> 
                    </div>
                  )
             }
        </div>
    )
}

export default App;