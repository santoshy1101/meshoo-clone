import {
  ADD_TO_CART,
  CLEAR_ITEM_CART,
  DECREMENT_ITEM_CART,
  GET_TOTAL_CART,
  INCREMENT_ITEM_CART,
  REMOVE_ITEM_CART,
} from "./actionTypes";

const initialState = {
  item: [],
  totalAmount: 0,
  totalItem: 0,
};

export const reducer = (state=initialState, {type, payload}) => {
 switch(type){

  case ADD_TO_CART:{
    return { ...state, item: [...state.item, payload]};
  }

  case INCREMENT_ITEM_CART:{
    const updatedCart = state.item.map((curElem) => {
          if (curElem.id === payload) {
            return { ...curElem, quantity: curElem.quantity + 1  };
          }
          else{
            return curElem
          }
        });
      
        return { ...state, item: updatedCart };
  }
   
  case DECREMENT_ITEM_CART :{
       const updatedCart = state.item
    .map((curElem) => {
      if (curElem.id === payload) {
        return { ...curElem, quantity: curElem.quantity - 1};
      }
     else{ return curElem};
    })
    .filter((curElem) => curElem.quantity !== 0);
  return { ...state, item: updatedCart };
  }

  case REMOVE_ITEM_CART:{
  return {
    ...state,
    item: state.item.filter((curElem) => {
      return curElem.id !== payload;
    }),
  };

  }

  case CLEAR_ITEM_CART:{
    return { ...state, item: [] };
  }

  default :{

    const tPrice = state.item.map((ele,ind)=>{
      const rate = + ele.price.replace("₹", "")
      console.log(ele.quantity,rate)
      return rate * ele.quantity;
    })
    const initialValue = 0;
    const sumTprice = tPrice.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      initialValue
    );

    console.log("tPrice" , tPrice , "sumTPrice", sumTprice )
    return {...state , totalItem:state.item.length , totalAmount:sumTprice}
  }
 }
  
};

// if (action.type === ADD_TO_CART) {
//   return { ...state, item: [...state.item, action.payload] };
// }

// if (action.type === REMOVE_ITEM_CART) {
//   return {
//     ...state,
//     item: state.item.filter((curElem) => {
//       return curElem.id !== action.payload;
//     }),
//   };
// }

// if (action.type === CLEAR_ITEM_CART) {
//   return { ...state, item: [] };
// }

// if (action.type === INCREMENT_ITEM_CART) {
//   const updatedCart = state.item.map((curElem) => {
//     if (curElem.id === action.payload) {
//       return { ...curElem, quantity: curElem.quantity + 1 };
//     }
//     else{
//       return curElem
//     }
//   });

//   return { ...state, item: updatedCart };
// }

// if (action.type === DECREMENT_ITEM_CART) {
//   const updatedCart = state.item
//     .map((curElem) => {
//       if (curElem.id === action.payload) {
//         return { ...curElem, quantity: curElem.quantity - 1 };
//       }
//      else{ return curElem};
//     })
//     .filter((curElem) => curElem.quantity !== 0);
//   return { ...state, item: updatedCart };
// }

// if (action.type === GET_TOTAL_CART) {
//   let {totalAmount } = state.item.reduce(
//     (accum, curVal) => {
//       let price = curVal.price.replace("₹", "");
//       let quantity = curVal.quantity;
//       // let { price, quantity } = curVal;

//       let updatedTotalAmount = price * quantity;
//       accum.totalAmount += updatedTotalAmount;

//       accum.totalItem += quantity;
//       return accum;
//     },
//     {
//       totalItem: 0,
//       totalAmount: 0,
//     }
//   );
//   return { ...state, totalItem:state.item.length, totalAmount };
// }