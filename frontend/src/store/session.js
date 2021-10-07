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


export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  console.log(data.user, "!!!!")
  dispatch(loginUser(data.user));
  return response;
};

export const login = (user) => async (dispatch) =>{
const {credential, password} = user;
try{
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({credential, password})
  })
  if (response.ok){
    const user = await response.json();
    dispatch(loginUser(user.user));
    return user;
  }
}catch(e){
  const err = await e.json()
    return err.errors[0];

  }
}

export const signUp = (payload) => async (dispatch) => {
  const {email, password, username } = payload;

    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      const data = await response.json();
      dispatch(loginUser(data.user));
      return response;

}

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  switch (action.type){
    case LOGIN:
     return {...state, user: action.payload};
    case LOGOUT:
      return {...state, user: null};

    default:
      return state;
  }
}








export default sessionReducer;
