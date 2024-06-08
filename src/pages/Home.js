import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalcartProduct from '../components/HorizontalcartProduct'
import VerticalCartProducts from '../components/VerticalCartProducts'


const Home = () => {
  return (
    <div>
    <CategoryList/>
    <BannerProduct/>

    <HorizontalcartProduct category={"airpodes"} heading={"Top's Airpodes"}/>
    <HorizontalcartProduct category={"watch"} heading={"Popular's Watch"}/>

    <VerticalCartProducts category={"mobile"} heading={"Mobils"}/>
    <VerticalCartProducts category={"bag"} heading={" Bag's"}/>
    <VerticalCartProducts category={"shoes"} heading={"Fashions Shoes"}/>
    <VerticalCartProducts category={"tv"} heading={"smart LCD"}/>
    <VerticalCartProducts category={"camera"} heading={"Camera & Photography"}/>
    <VerticalCartProducts category={"perfuem"} heading={"Perfuem"}/>
    <VerticalCartProducts category={"earphone"} heading={"Wireless Earphone"}/>
    <VerticalCartProducts category={"spaeker"} heading={"Speaker"}/>
    <VerticalCartProducts category={"mouse"} heading={"Mouse"}/>
    <VerticalCartProducts category={"keyboard"} heading={"Keyboard"}/>
    <VerticalCartProducts category={"printer"} heading={"Printer"}/>
    <VerticalCartProducts category={"processor"} heading={"Processor"}/>
    <VerticalCartProducts category={"trimer"} heading={"Trimer Haircutting"}/>
    
    </div>
  )
}

export default Home
