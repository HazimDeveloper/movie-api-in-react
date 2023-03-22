
import { Container,Row,Col,Card,Form,InputGroup } from 'react-bootstrap';
import React , {useEffect,useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './App.css';

const App = () => {
    const [movies,setMovies] = useState([])

    const searchMovie = (q) => {
    
    axios.get(`${process.env.REACT_APP_BASE_URL}/search/movie?query=${q}&api_key=${process.env.REACT_APP_API_KEY}`)
      .then((response) => {

        if(q.length > 3){

          
          setMovies(response.data.results);
        }
      }); 

    }
    useEffect(() =>{
      axios.get(`${process.env.REACT_APP_BASE_URL}/movie/popular`,{
        params: {
          api_key : process.env.REACT_APP_API_KEY

        }
      }).then((response) => {
        setMovies(response.data.results)
      })
    },[])

  return (
   <>
   <div className=' mx-auto bg-warning '>    
     <Container >
        <Row> 

      <h2 className='text-center mt-5 '>Welcome To Hakas Movie</h2>
      <h5 className='text-center mt-2'>Made With ❤️️  By Muhammad Hazim </h5>
      <InputGroup className="mb-3 mt-3">
        <Form.Control
          placeholder="Search Movie You Love ...."
        onChange={({target}) => { searchMovie(target.value) }}
        />
      </InputGroup>
      {movies.map((result,index) => {
      
        if(result === 0 ){
          return "Movie Not Found";
        } 
        return(
<Col xl={3} md={4} sm={6} key={index} className='d-flex justify-content-center align-items-center mt-2 mb-3'>
<Card style={{width:'100%', height:'100%'}} className='bg-dark text-white border ' >

  <Card.Img variant="top" src={result.poster_path == null ? process.env.PUBLIC_URL + '/imgnotfound.png'  : process.env.REACT_APP_IMAGE + result.poster_path} />
      <Card.Body>
        <Card.Title className="text-center mb-2">{result.title}</Card.Title>
        <Card.Text>

          <div className='mt-3 mb-1'> Language :  {result.original_language}</div>
          <div>Release Date : {result.release_date}</div>
          <div>⭐️{result.vote_average}</div>

        </Card.Text>
      </Card.Body>
    </Card>
</Col>
        )
      }) }
                
      </Row>
      </Container>
    
      </div>
      
  </>
  );

  }


export default App;
