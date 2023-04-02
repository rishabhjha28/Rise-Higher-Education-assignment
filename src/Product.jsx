import axios from 'axios'
import './App.css';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const Product = () => {
    const iniData = {}
    const params = useParams()
    const [isLoading,setIsLoading] = useState(true)
    const [data,setData] = useState(iniData)
    const navigate = useNavigate();  
    useEffect(()=>{
        axios.get(`https://fakestoreapi.com/products/${params.id}`)
        .then(res=>{
            if(res.data){
                setIsLoading(false)
                setData(res.data)
            }
            else{
                navigate('/error')
            }
        })
        .catch(err=>{
            console.log(err)
            navigate('/error')
        })
    },[])
    return (
        <>
        {
            isLoading?<div>
              Loading  
            </div>:<div className='App'>
                <img src={data.image} alt={data.title}/>
                <h3>Product: {data.title}</h3>
                <h3>Category: {data.category}</h3>
                <h3>Price: ${data.price}</h3>
                <h4>{data.description}</h4>
                <br />
                <br />
                <br />
                <Link to = {-1}>Back</Link>
            </div>
        }
    </>
  )
}

export default Product