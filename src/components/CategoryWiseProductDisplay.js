import React, { useContext, useEffect,  useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import displayCurrency from '../helper/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa";
import addToCart from '../helper/addToCart';
import { Link } from 'react-router-dom';
import Context from '../context/Context';
import scrollTop from '../helper/scrollTop';


const CategoryWiseProductDisplay = ({category, heading}) => {

    const[data, setDate]  = useState([])
   const [loading, setLoading] = useState(true)
   const loadingList = new Array(13).fill(null)

   const { fetchUserAddToCart } = useContext(Context)


  const handlerAddToCart = async(e, id) => {
   await addToCart(e,id)
   fetchUserAddToCart()
  }
   
 
   const fetchData = async() => {
    setLoading(true)
    
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
   
    setDate(categoryProduct?.data)
   }
     useEffect(() => {
        fetchData();
     }, []) 
     
     

    return (
    <div className='container mx-auto px-4 my-6 relative'>

        <h2 className='text-2xl font-semibold py-2'>{heading}</h2>

          <div className='grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
             
          {
            loading ? (
                loadingList.map((product,index) => {
                    return(
                        <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow flex'>
                        <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                           
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2  animate-pulse rounded-full bg-slate-200'></h2>
                            <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200 py-2'></p>
                            <div className='flex gap-3 '>
                            <p className='text-rose-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                            <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full py-2'></p>
                            </div>

                            <button className='text-sm  text-white px-3 py-0.5 rounded-full bg-slate-200 py-2 animate-pulse'></button>
                        </div>
                        </div>
                   )
                })
            ) : (
                data.map((product,index) => {
                    return(
                        <Link to={"/product/"+product?._id} className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-sm shadow' onClick={scrollTop}>
                        <div className='bg-slate-200 h-48 p-4 min-w-[120px] md:min-w-[145px] flex justify-center items-center'>
                            <img src={product.productImage[0]} className='h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply'/>
                        </div>
                        <div className='p-4 grid gap-3'>
                            <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h2>
                            <p className='capitalize text-slate-500'>{product?.category}</p>
                            <div className='flex gap-3'>
                            <p className='text-rose-600 font-medium'>{displayCurrency(product?.selling)}</p>
                            <p className='text-slate-500 line-through'>{displayCurrency(product?.price)}</p>
                            </div>

                            <button className='text-sm bg-rose-600 hover:bg-rose-800 text-white px-3 py-0.5 rounded-full' onClick={(e) => handlerAddToCart(e, product?._id)}>Add To Cart</button>
                        </div>
                        </Link>
                   )
                })

            )
            
          }

          </div>
        
    </div>
  )
}

export default CategoryWiseProductDisplay
