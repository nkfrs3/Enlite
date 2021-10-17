// import { csrfFetch } from "./csrf";
// const CHECK_IN = '/checkins/checkin'

// const checkIn = () => ({
//   type: checkIn

// })


// export const createCheckIn = (data) => async (dispatch) => {
//   const {userId, shopId} = data;
//   const res = await csrfFetch('/api/checkin', {
//     method: "PUT",
//     body: {userId, shopId}
//   })
//   dispatch(checkIn());
// }

// const initialState = [];

// const checkInsReducer = (state = initialState, action) => {
//   switch(action.type){
//     case CHECK_IN:

//     return  [...state, action]
//     default: return state;
//   }
// }


// export default checkInsReducer;
