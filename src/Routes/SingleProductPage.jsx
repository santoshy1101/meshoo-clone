
import { useToast } from "@chakra-ui/react";
import React, { useState, useEffect, memo } from "react";
import { AiFillStar } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom/dist";

import { addToCart, } from "../Redux/AddtoCart/action";
import "./SingleProductPage.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';



function SingleproductsPage() {
  const products = useSelector((store)=>store.productsReducer.products)
  const item = useSelector((store)=>store.addtoCartReducer.item);
  const [addedCart, setAddedCart] = useState(false);
  const [size, setSize] = useState("");
  const [singleProduct, setSingleProduct] = useState([]);
  const dispatch = useDispatch();
  const toast = useToast();
  const {id} = useParams()
  const {pathname} = useLocation();
  const navigate= useNavigate()
console.log(item);
  useEffect(() => {
    const path = pathname.replaceAll(id, "").replaceAll("/","");
    setSingleProduct(products[path].find((ele)=>ele.id===id))
   
  }, []);

  const handleAddCart =()=>{
    if(size.length>0){
      const itemObject = {...singleProduct,size}
      const newData=item.map(ele=>ele.id === itemObject.id)
      if(!newData.includes(true)){
        dispatch(addToCart(itemObject))
        toast({
          title: `Product Succesfully added in cart`,
          status: 'success',
          position:'top',
          duration:1400,  
        })
//         console.log(item,"item");
// console.log(products,"products");
        setSize("")
       }else{toast({
        title: `This Product already have in cart`,
        status: 'warning',
        position:'top',
        duration:1400,
      })
       }
    }
    else{
      toast({
        title: `Please Add Size`,
        status: 'success',
        position:'top',
        duration:1000,
        
      })
    }
  }

  const handleSize = (e) => {
    let newSize = e.target.innerText;
    setSize(newSize);
  };

  const buynowHandler=()=>{
    if(size.length>0){
      const itemObject = {...singleProduct,size}
      const newData=item.map(ele=>ele.id === itemObject.id)
      if(!newData.includes(true)){
        dispatch(addToCart(itemObject))
        toast({
          title: `Product Succesfully added in cart`,
          status: 'success',
          position:'top',
          duration:1400,
        })
        setSize("")
        navigate("/Add to cart")
        
       }else{toast({
        title: `This Product already have in cart`,
        status: 'warning',
        position:'top',
        duration:1400,
      })
      navigate("/Add to cart")
       }
    }
    else{
      toast({
        title: `Please Add Size`,
        status: 'success',
        position:'top',
        duration:1000,
        
      })
// alert("plz side add")
    }
    
  }


  return (
    <div>
      <div className="flex flex-col mt-5 ml-20 mr-20 lg:flex-row md:flex-col">
        {/* left side */}
        <div className="flex">
          <div className="leftdiv">
            <img
              className="w-20 mx-1 border-2 border-solid rounded border-sky-500 leftside"
              src={singleProduct.img1}
              alt=""
            />
          </div>

          <div className="left2div">
            {/* middle side */}
            <div className="mx-3 border-solid border border-sky-rgb(240 240 240)  rounded">
              <img
                width={"85%"}
                className="mt-1 mb-1 ml-auto mr-auto"
                src={singleProduct.img1}
                alt=""
              />
            </div>

            <div className="flex justify-evenly name">
              <button className="addbtn" onClick={handleAddCart}>
                {addedCart ? "Card Added" : "Add to Cart"}
              </button>
              <button className="addbtn2" onClick={buynowHandler}> 
                  Buy Now
                </button>
            </div>
          </div>
        </div>

        <div>
          <div className="mx-3 py-3 px-5 border-solid border border-sky-rgb(240 240 240)  rounded rightside1">
            <h2 className="heading">{singleProduct.name}</h2>
            <h2 className="mt-2 text-lg font-bold font">{singleProduct.price}</h2>
            {/* <p className="rating">{products.rating}</p> */}
            <div className="flex items-center my-[5px]">
              <div className=" gap-x-1 px-2 rounded-2xl text-slate-50 text-lg font-semibold flex bg-green-400 items-center  mr-[14px]">
                <p>{singleProduct.rating}</p>
                <div>
                  <AiFillStar color="white" size={15} />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-400">
                {singleProduct.reviews}
              </p>
            </div>
            <p className="delivery">{singleProduct.delivery}</p>
          </div>

          <div className="mx-3 py-3 px-5 border-solid border border-sky-rgb(240 240 240)  rounded my-3 sizediv ">
            <h2 className="my-3 font-bold">Select Size</h2>
            <div className="flex gap-x-5">
              {singleProduct.size &&
                singleProduct.size.map((el, index) => {
                  return (
                    <button
                      onClick={(e) => handleSize(e)}
                      className={`border px-4 text-lg font-semibold  hover:text-[#F43397] 
      hover:border-[#F43397]  hover:scale-110 duration-700  ${size.length>0 && "text-[#F43397] rounded-2xl border-[#F43397]"}`}
                      key={index}
                    >
                      {el}
                    </button>
                  );
                })}
            </div>
          </div>

          <div className="mx-3 py-3 px-5 border-solid border border-sky-rgb(240 240 240)  rounded my-3 sizediv">
            <h2 className="my-5">products Details</h2>
            <p>Name : {singleProduct.name}</p>
            {/* <p className="w-[30%]">Desc : {products.desc}</p> */}
            <p> Net Quantity (N): {singleProduct.quantity} </p>
            <p>Sizes : {singleProduct.size}</p>
            <p> Country of Origin : India</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default memo(SingleproductsPage);