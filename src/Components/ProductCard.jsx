import React from "react";
import { Box, Badge } from "@chakra-ui/react";
import { img1 } from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
//import {AiFillStar} from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";

const ProductCard = ({
  onwards,
  delivery,
  rating,
  reviews,
  id,
  img1,
  name,
  price,
  productKey,
}) => {

  
const {pathname} = useLocation()
const navigate = useNavigate()

  // console.log("Prodcut key of ", productKey);

  // <Link to={`/${productKey || "All Sarees"}/${id}` }>
 const cardClickHandler=()=>{
  
  const path = pathname.replaceAll("/" , "")
  if (path ===""){
    navigate(`/dresses/${id}`,"id")
    console.log("path", path, "id", id)
  }
else{
  navigate(`/${path}/${id}`,"id")
}
  


    
  }


  return (
    <div className="cursor-pointer group over" onClick={cardClickHandler}>
        <div className="duration-500  border group-hover:shadow-2xl group-hover:shadow-[#F43397] group-hover:border-[#F43397] lg:w-[200px]  md:w-[160px] sm:w-[158px]  lg:text-[18px] max-[639px]:text-[10px] md:text-[15px] rounded-3xl  ">
          {/* <img src={img1} alt="img1" height="350px" width="100%" /> */}

          <div className="lg:h-[250px]  sm:h-[200px] h-[120px] group overflow-hidden   duration-700   ">
            <img
              className="w-[100%] rounded-3xl group-hover:rounded-full h-[100%] group-hover:scale-125 duration-700 object-contain"
              src={img1}
              alt={name}
            />
          </div>
          <div className="px-4 py-4 ">
            <div className="font-semibold text-md text-slate-400">{name}</div>

            <div className="flex flex-col gap-y-2 ">
              <div className="flex items-end gap-x-2">
                <div className="text-2xl font-bold">{price}</div>
                <p className="hidden text-sm font-semibold text-slate-400 sm:block">
                  {onwards}
                </p>
              </div>
              <div className=" w-[110px] max-[639px]:w-[95px] animate-bounce group-hover:animate-none px-3 my-2 bg-slate-300 text-sm py-1 rounded-lg font-semibold">
                {delivery}
              </div>
              <div className="flex items-center gap-x-2">
                <div className="flex items-center px-1 sm:px-2 max-[639px]:text-[8px] text-lg font-semibold bg-green-400 gap-x-1 sm:rounded-2xl rounded-sm text-slate-50 animate-pulse animate-ping group-hover:animate-none">
                  <p>{rating}</p>
                  <div>
                    <AiFillStar color="white" className="text-lg  max-[639px]:text-[7px]"/>
                  </div>
                </div>
                <div className="text-sm font-semibold text-slate-400 animate-spin group-hover:animate-none">
                  {reviews}
                </div>
              </div>
            </div>
          </div>
        </div>
     
    </div>
  );
};

export default ProductCard;