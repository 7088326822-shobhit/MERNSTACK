import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common/Common';
import VerticalProduct from '../components/VerticalProduct';


const SearchProduct = () => {

    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    console.log("query", query.search);


    const fetchData = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = response.json()
        setLoading(false)

        setData(dataResponse.data)

        
    }


    useEffect(() => {
        fetchData()
    },[query])

  return (
    <div className='container mx-auto p-4'>
    {
      loading && (
        <p className='taxt-lg text-center'>loading...</p>
      )
    }
      <p className='text-lg font-semibold my-3'>Seacrh : {data.length} </p>
    

      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center p-4'>No Data Found</p>
        )
      }

      {
        data.length !==0 && !loading && (
          
              <VerticalProduct loading={loading} data={data}/>
           
        )
      }

    </div>
  )
}

export default SearchProduct
