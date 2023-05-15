import {useState, useEffect} from 'react';
import { useTheme, Typography, Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/index.jsx';
import Loading from '../../components/Loading';


const SearchPage = () => {
    const [result, setResult] = useState([]);
    const dispatch = useDispatch();
    
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');

    if(result.length === 0) {

    }
    useEffect(() => {
      const fetchSearchResult = async (value) => {
        try {
          const fetchSearchResultResponse = await fetch(
            `http://localhost:5000/search/?query=${value}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
          const data = await fetchSearchResultResponse.json();
          const results = data.results.filter((movie) => movie.media_type === 'tv' || movie.media_type === 'movie').map((movie) => ({
          label: movie.original_name ? movie.original_name : movie.original_title,
          id: movie.id,
          poster_path: movie.backdrop_path,
          media_type: movie.media_type
          }));
          setResult(results);
        } catch (err) {
          console.error(err)
        }
      }
      fetchSearchResult(query);
    }, [query])
    
    if (result.length === 0) {
      return (
        <div>
          <Navbar></Navbar>
          <strong> The thing you looking for does not seem to exist LOL</strong>
        </div>
      )
       
    }

    return (
      <div>
        <Navbar></Navbar>
      {result.map((movie) => (
        <div key={movie.id}>
          <img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.label} />
          <p>{movie.label}</p>
        </div>
      ))}
    </div>
    )

}

export default SearchPage;