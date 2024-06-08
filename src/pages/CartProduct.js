import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common/Common'
import Context from "../context/Context"
import displayCurrency from "../helper/displayCurrency"

const Cart = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(context.countCartProduct).fill(null)

    const fetchData = async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.addTocartProductView.url,{
            method: SummaryApi.addTocartProductView.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"
            },

        })
        setLoading(false)

        const responseData = await response.json()

        if (responseData.success) {
            setData(responseData.data)
        }
    }

    useEffect(() => {
        fetchData()
    },[])

     const increaseQty = async(id, qty) => {
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method: SummaryApi.updateCartProduct.method,
            credentials: 'include',
            headers: {
                "content-type" : "application/json"

            },
            body : JSON.stringify({
                quantity : qty + 1
            })

        })

        const responseData = await response.json()

        if (responseData.success) {
            fetchData()
        }

     }

    const decreaseQty = async(id,qty) => {
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url,{
                method: SummaryApi.updateCartProduct.method,
                credentials: 'include',
                headers: {
                    "content-type" : "application/json"
    
                },
                body : JSON.stringify({
                    quantity : qty - 1
                })
    
            })
    
            const responseData = await response.json()
    
            if (responseData.success) {
                fetchData()
            }
    
         }
        }
    


  return (
    <div className='container mx-auto'>
      <div className='text-center taxt-lg my-3'>
        {
            data.length === 0 && !loading && (
                <p className='py-5 bg-slate-200'>No Data</p>
            )
        }
      </div>


      <div className='flex flex-col lg:flex-row gap-10 justify-between p-4'>
        {/* view product */}
          
          <div className='w-full max-w-3xl'>
             {
                loading ? (
                    loadingCart.map(el =>{
                        return(
                            <div key={el+ "Add to cart loading"} className='w-full bg-slate-200 h-32 my-2 border-slate-300 animate-pulse rounded'></div>
                        )
                    })
                    

                ) : (
                   data.map((product,index) => {
                     return(
                        <div key={product?._id+ "Add to cart loading"} className='w-full bg-white h-32 my-2
                            border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                           <div className='w-32 h-32 bg-slate-200'>
                             <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down mix-blend-multiply'/>
                           </div>

                            <div className='px-4 py-2 relative'>

                            <div class

                             <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1'>{product?.productId?.brandName}</h2>
                             <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                             <p className='text-red-600 font-medium text-lg'>{displayCurrency(product?.productId.selling)}</p>
                             
                             <div className='flex items-center gap-3 mt-2'>
                                
                               <button className='border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => decreaseQty(product?._id,product?.quantity)}>-</button>
                                <span>{product?.quantity}</span>
                               <button className='border border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white w-6 h-6 flex justify-center items-center rounded' onClick={() => increaseQty(product?._id,product?.quantity)}>+</button>
                             </div>
                            </div> 
                        </div> 
                     )
                   })
                )
             }
          </div>

          {/* ******total product******* */}

          <div className='mt-5 lg:mt-0 w-full max-w-sm'>
            {
                loading ? (
                    <div className='h-36 bg-slate-200 border border-slate-200 animate-pulse'>
                    Total
                    </div>
                ) : (
                    <div className='h-36 bg-slate-200'>
                        Total
                    </div>
                )
            }
          </div>
      </div>
    </div>
  )
}


export default Cart
