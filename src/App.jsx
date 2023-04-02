import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const limit =5;
  const navigate = useNavigate()
  const [page,setPage] = useState(1)
  const [data,setData] = useState([])
  const [tData,setTData] = useState([])
  const [toShow,setToShow] = useState([]) 
  const [search,setSearch] = useState("")
  useEffect(()=>{
    axios.get(`https://fakestoreapi.com/products`)
    .then(res=>{
      setData(res.data);
      setTData(res.data);
    })
    .catch(err=>{
      console.log(err);
    })
  },[])
  useEffect(()=>{
    setArray()
  },[tData,page])
  const setArray = ()=>{
    const temp = tData.filter((p,i)=>(((page-1)*limit<=i) && (page*limit>i)))
    setToShow(temp)
  }
  const handleSearch = (e) =>{
    e.preventDefault()
    if(search){
      const s = search.toLowerCase()
      const temp = data.filter((product)=>{
        return (product.title.toLowerCase().includes(s) || product.category.toLowerCase().includes(s) || product.discription.toLowerCase().includes(s))
      })
      setTData(temp)
    }
    else{
      setTData(data)
    }
    setPage(1)
  }
  return (
    <div className="App">
      <div>
        <form onSubmit={handleSearch}>
          <input type="search" value = {search} onChange={(e)=>{setSearch(e.target.value)}} name="search"/>
          <button type="submit">search</button>
        </form>
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Category</th>
            <th>Discription</th>
            <th>Price</th>
            <th>Rating(count)</th>
          </tr>
        </thead>
        <tbody>
          {
            toShow.map(product=><tr key = {product.id}>
              <td className='title' onClick={()=>{navigate(`/${product.id}`)}}>{product.title}</td>
              <td>{product.category}</td>
              <td>{product.discription}</td>
              <td>{product.price}</td>
              <td>{product.rating.rate+'('+product.rating.count+')'}</td>
            </tr>)
          }
        </tbody>
      </table>
      <div>
          <button disabled={page === 1} onClick={()=>{setPage(page-1)}}>&lt;</button>
          <button disabled={Math.ceil(tData.length/limit) === page } onClick={()=>{setPage(page+1)}}>&gt;</button>
      </div>
    </div>
  );
}

export default App;
