import { csrfFetch } from "./csrf";

const LOGIN = 'session/login';
const LOGOUT = 'session/logout'


const loginUser = payload => ({
  type: LOGIN,
  payload
})

const logOut = () => ({
  type: LOGOUT
})

export const login = (user) => async (dispatch) =>{
const {credential, password} = user;
try{
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({credential, password})
  })
  if (response.ok){
    const user = await response.json();
    dispatch(loginUser(user));
    return user;
  }
}catch(e){
  const err = await e.json()
    return err.errors[0];

  }
}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type){
    case LOGIN:
      if (action.payload.user)  return {...state, user: action.payload};
    case LOGOUT:
      return {...state, user: null};

    default:
      return state;
  }
}








export default sessionReducer;
