const SHOPS = '/shops/fetch';


const setShops = (payload) => ({
  type: SHOPS,
  payload
})

export const fetchShops = () => async(dispatch) => {
  const res = await fetch('/api/shops');
  const allShops = await res.json();
  dispatch(setShops(allShops));
}

const intialState = [];

const shopsReducer = (state = intialState, action) => {
  switch(action.type){
        case SHOPS:
          return [...state, ...action.payload]
        default:
        return state;
  }
}



export default shopsReducer;
