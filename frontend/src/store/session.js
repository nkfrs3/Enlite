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
  try{
    const response = await csrfFetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
    if (response.ok){
      const data = await response.json();
      dispatch(loginUser(data.user));
      return data.user;
    }
  } catch(e){
    const err = await e.json()
      return err.errors;
    }
  }

  export const editAccount = (body) => async (dispatch) => {
    const {id, color, icon} = body;
    const res = await csrfFetch(`/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({color, icon}),
    });
    const data = await res.json();
    dispatch(loginUser(data))
  }

  export const logout = () => async (dispatch) => {
    const res = await csrfFetch('/api/session', {
      method: 'DELETE',
    })
    dispatch(logOut());
    return res;
  }

  // export const deleteAccount = (id, password) => async(dispatch) => {
  //   const res = await csrfFetch(`/api/users/${id}/${password}`, {
  //     method: 'DELETE',
  //   });
  //   dispatch(logOut);
  //   console.log(res, "RES!!!");
  //   return res.json();
  // }
  export const demoLogout = (id) => async (dispatch) => {

    const res = await csrfFetch('/api/session/demo/' + id, {
      method: 'DELETE',
    })
    dispatch(logOut());
    return res;
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
