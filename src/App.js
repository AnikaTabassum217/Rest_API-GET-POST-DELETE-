
import logo from './logo.svg';

import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios';
import Spinner from 'react-spinner';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";


function App() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // GET API 
   
    setIsLoading(true);
    const url = 'https://jsonplaceholder.typicode.com/comments';
    fetch(url)
      .then(response => response.json())
      .then(json => {
        console.log('jsonnnn', json);
        setData(json);
        setIsLoading(false); // Set loading state to false once data is fetched
      })
      .catch(e => {
        console.log('e', e);
        setIsLoading(false); // Set loading state to false in case of error
      });
  }, []);

  

    const postData = e => {
    e.preventDefault();
    setIsLoading(true);
    Axios.post('https://jsonplaceholder.typicode.com/comments', {
      title,
      body
    })
      .then(res => {
        console.log('Posting data', res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };



    const postDelete = (id, e) => {
    e.preventDefault();
    setIsLoading(true);
    Axios.delete(`https://jsonplaceholder.typicode.com/comments/${id}`)
      .then(res => {
        console.log('Deleted!!!', res);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <div className="App">
      <h2>Welcome</h2>
      <form>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <hr />

        <label>Body</label>
        <input
          type="text"
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <hr />
        {isLoading ? (
         <div>
         <ClimbingBoxLoader color="#36d7b7" />
       </div>
      ) : (
        <button onClick={postData}>POST</button>
      )}
        
      </form>
      {isLoading ? (
         <div>
         {/* <Spinner /> {
         Loading... */}
         {/* <ClimbingBoxLoader color="#36d7b7" /> */}
       </div>
      ) : (
        data.map(item => (
          <div key={item.id}>
            {item.email}
            <button onClick={e => postDelete(item.id, e)}>Delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default App;
