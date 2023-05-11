import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'

import ProductCard from '../../Components/ProductCard'
import Loading from '../Loader/Loading'

// import Filter from '../Components/Filter'
import { useDispatch, useSelector } from 'react-redux'

const HomePageProducts = () => {


  const [loading, setLoading] = useState(false)
  const [searchParams, setSearchParams] = useSearchParams()
  let initState = searchParams.get('page')
  const [page, setPage] = useState(parseInt(initState) || 1)
  const { pathname } = useLocation()
  const path = pathname.replaceAll('/', '')

  const products = useSelector((store) => store.productsReducer.products)

  // console.log(products, 'path')
  useEffect(() => {

  }, [])

//   max-[320px]:grid-cols-2

  return (
    <div className="py-10 ">
      <div className="flex flex-row justify-around  lg:w-[90%] w:-[100%]  m-auto ">
        <div className="grid gap-12 lg:grid-cols-4 md:grid-cols-4 sm:grid-cols-3 max-[639px]:grid-cols-2">
          {products['dresses']?.length > 0 &&
          products['dresses']?.map((ele) => {
              return <ProductCard key={ele.id} {...ele} />
            })}
        </div>
      </div>

    </div>
  )
}

export default HomePageProducts