import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
// import SidebarSaree from "../Components/Saree/SidebarSaree";
import ProductCard from "../Components/ProductCard";
import Loading from "../Components/Loader/Loading";
import Pagination from "../Components/Pagination/Pagination";
import Filter from "../Components/Filter";
import { useDispatch, useSelector } from "react-redux";

const ProductsList = (prop) => {
  // let { path, p, productKey } = prop;
  // console.log("productKey: fefwfwe", productKey);
  const [filt,setFilt]=useState([])

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  let initState = searchParams.get("page");
  const [page, setPage] = useState(parseInt(initState) || 1);
  const {pathname} = useLocation();
  const path = pathname.replaceAll("/","")
  // const dispatch=useDispatch()
  const products = useSelector((store)=>store.productsReducer.products)
  
  // console.log(loc);

  // console.log("path",path)
  // if(!path){
  //   path="allsarees"
  // }

  // const getProducts = async (arg = 1) => {
    
  //   // let newaPath =pathname.split("").filter((el)=> el!=="/" && el!== "%" && el!=="2" && el!=="0").join("").toLocaleLowerCase()
  //   let newPath = path.replaceAll(" ", "").toLowerCase();
  //   setLoading(true);
  //   axios
  //     .get(
  //       `https://meshoo-mock-server-app.onrender.com/${newPath }?_page=${page}&_limit=16`
  //     )
  //     .then((res) => {
  //       setLoading(false);
  //       setData(res.data);
  //       setFilt(res.data)
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setLoading(false);
  //     });
  // };

  // useEffect(() => {
  //   getProducts(page);
  //   const params = {
  //     page,
  //     limit: 16,
  //   };
  //   setSearchParams(params);
  //   window.scrollTo(0, 0);

  // }, [page, path]);

  // if (loading) {
  //   return <Loading />;
  // }
  // useEffect(()=>{
    
  // })

useEffect(()=>{

  setFilt(products[path || "allsarees"])
  
},[])

  const filtByRating=(item)=>{
    if(item){
      item= +item
      if(item){
        let newData = products[path].filter((el)=>{
         return el.rating>=item
        }) ;
      setFilt(newData)
      }
      else{
        setFilt(data)
      }
    }else{
      setFilt(products[path || "allsarees"])
    }
    }
   
   
  // console.log("filt",data)

  const sortingHandler =(item)=>{

   let newData = products[path].map((ele)=>{
     return ({...ele,price:parseInt(ele.price.split("").splice(1).join(""))})
    })

    if(item === "asc"){
      newData = newData.sort((a,b)=>{
        return a.price - b.price;
      })
      setFilt(newData)
    }
    else if( item === "desc"){
      newData = newData.sort((a,b)=> b.price - a.price)
      setFilt(newData)
    }


    




  }
  


  return (
    <div className="px-8 py-10">
      <div className="flex flex-row justify-around gap-x-20 ">
        <div className="hidden shadow-xl sm:block">
          <Filter filtByRating={filtByRating} sortingHandler={sortingHandler} />
        </div>
        <div className="grid max-[320px]:grid-cols-2 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-x-8 gap-y-10 ">
         {filt.length > 0 &&filt.map((ele) => {
              return (
                <ProductCard key={ele.id} {...ele} />
              );
            })} 
        </div>
      </div>
      <Pagination
        pageNumber={page}
        setPageNumber={setPage}
        dataLength={data.length > 0 && data.length}
      />
    </div>
  );
};

export default ProductsList;