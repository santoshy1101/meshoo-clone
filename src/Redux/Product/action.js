import axios from "axios";
import {
  EDIT_PRODUCTS_SUCCESS,
  GET_PRODUCTS_FAILURE,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "./actionType";

const getProductsRequestAction = () => {
  return { type: GET_PRODUCTS_REQUEST };
};

const getProductsSuccessAction = (payload) => {
  return { type: GET_PRODUCTS_SUCCESS, payload };
};

const getProductsFailureAction = () => {
  return { type: GET_PRODUCTS_FAILURE };
};

export const getProducts = (category) => (dispatch) => {
  
  dispatch(getProductsRequestAction());
  axios
    .get(`https://adorable-sarong-calf.cyclic.app/${category}`)
    .then((res) => {
      dispatch(getProductsSuccessAction(res.data));
      // console.log(res.data)
    })
    .catch((err) => {
      dispatch(getProductsFailureAction());
    });
};

export const singleProduct = (productKey, id) => (dispatch) => {
  dispatch(getProductsRequestAction());

  axios
    .get(`https://meshoo-mock-server-app.onrender.com/${productKey}/${id}`)
    .then((res) => {
  
      dispatch(getProductsSuccessAction(res.data));
    })
    .catch((err) => {
      dispatch(getProductsFailureAction());
    });
};
