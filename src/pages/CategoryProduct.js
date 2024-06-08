import React, { useEffect, useState } from 'react'
import {  useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from "../helper/productCategory"
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay'
import VerticalProduct from '../components/VerticalProduct'
import SummaryApi from '../common/Common'

const CategoryProduct = () => {

    const params = useParams()
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
      urlCategoryListObject[el] = true
    })

    console.log("urlCategoryListObject", urlCategoryListObject);
    console.log("urlCategoryListinArray", urlCategoryListinArray);

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

   const [sortBy, setSortBy] = useState("")

    const fetchData = async() => {
     

      const response = await fetch(SummaryApi.filterProduct.url,{
        method: SummaryApi.filterProduct.method,
        headers: {
          "content-type" : "application/json"

        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const responseData = await response.json()

      setData(responseData?.data || [])
      console.log(responseData);
    }

    const handleSelectCategory = (e) => {
      const {name, value, checked} = e.target;

      setSelectCategory((preve) => {
        return{
          ...preve,
          [value] : checked
        }
      })

    }
    // console.log("select category", selectCategory);

    useEffect(() => {
      fetchData()
    },[filterCategoryList])

    useEffect(() => {
      const arrayCategory = Object.keys(selectCategory).map(categoryKeyName => {
        if (selectCategory[categoryKeyName]) {
          return categoryKeyName
        }
        return null
      }).filter(el => el)
      setFilterCategoryList(arrayCategory)

      //format for url change when change on the checkbox

      const urlFormat = arrayCategory.map((el, index) => {
        if ((arrayCategory.length - 1 ) === index ) {
          return `category=${el}`
        }

        return `category=${el}&&`
      })

      console.log("urlFormat", urlFormat.join(""));
      navigate("/product-category?"+urlFormat.join(""))

      // product-category?category=earphone
      

    },[selectCategory])


  const handleOnSortBy = (e) => {
      const {value} = e.target

      setSortBy(value)

      if (value === 'asc') {
        setData(preve => preve.sort((a,b) => a.selling - b.selling))

      }

      if (value === 'dsc') {
        setData(preve => preve.sort((a,b) => b.selling - a.selling))
      }
  }

  useEffect(() => {

  }, [sortBy])


    // {params?.categoryName}

  return (
    <div className='container mx-auto p-4'>

       {/* **********desktop version************** */}

        <div className='hidden lg:grid grid-cols-[200px,1fr]'>
          {/* left side */}
          <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-2 border-slate-300'>Sort By</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' checked={sortBy === 'asc'} value={"asc"} onChange={handleOnSortBy}/>
                  <label>Price- Low to High</label>
                </div>



                <div className='flex items-center gap-3'>
                  <input type='radio' name='sortBy' checked={sortBy === 'dsc'} value={"dsc"} onChange={handleOnSortBy}/>
                  <label>Price- High to Low</label>
                </div>
              </form>
            </div>

            {/* filter by */}

            <div className=''>
              <h3 className='text-base uppercase font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>

              <form className='text-sm flex flex-col gap-2 py-2'>
                {
                  productCategory.map((categoryName,index) => {
                    return(
                      <div className='flex items-center gap-3'>
                        <input type='checkbox' name={"category"} checked={selectCategory[categoryName.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                        <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                      </div>
                    )
                  })
                }
              </form>
            </div>
          
          </div>


          {/* right side */}

           <div className='px-4'>
           <p className='font-medium test-slate-800 text-lg my-2'>Search results : {data.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                data.length !== 0 &&  (
                  <VerticalProduct data={data} loading={loading}/>
                )
              }
             </div>
           </div>
        </div>

    </div>
  )
}

export default CategoryProduct