import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct';
import SummaryApi from '../common/Common';
import AdminProductCart from '../components/AdminProductCart';

 const AllProducts = () => {

  const[openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProducts = async() => {
    const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()

      setAllProduct(dataResponse?.data || [])
  }

  useEffect(() => {
    fetchAllProducts()
  },[])

  return (
    <div className=''>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg'>All Products</h2>
        <button className='boder-2 border-red-600 text-red-600 hover:bg-red-600 
             hover:text-white transition-all py-1 px-3 rounded-full' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>


      {/* all product********* */}

      <div className='flex items-center flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll bg-rose-100 '>
        {
          allProduct.map((product,index) => {
            return(
              <AdminProductCart data={product} key={index} fetchdata={fetchAllProducts}/>
            )
          })
        }
      </div>

      {/* upload product component */}
      {
        openUploadProduct && (

        <UploadProduct onClose={() => setOpenUploadProduct(false)} fetchdata={fetchAllProducts}/>
        )
      }
    </div>
  )
}

export default AllProducts;
