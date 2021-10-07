import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import './LoginForm.css';
import { login } from '../../store/session';



  const LoginForm = ({setShowLogin}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginErrors, setLoginErrors] = useState('');
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value)
  const handleClose = e => {e.preventDefault(); setShowLogin(false)};

   useEffect(() => {
      setLoginErrors("");

  }, [userName, email]);

  const onKeyDown = e => {
    if (e.key == 'Enter'){
    handleSubmit(e);
  }}

  const handleSubmit = async(e) => {
    e.preventDefault();
    let payload = {};
     payload['credential'] = userName;
     payload['password'] = password;
    // console.log(payload);
    const user = await dispatch(login(payload));
    console.log(user)
    if (typeof user === 'object'){
      setShowLogin(false);
      <Redirect to="/" />
    }else {
      console.log("made it")
      setLoginErrors(user);
    }

  }

  return (
    <section className='login-container'>
    <form onSubmit={handleSubmit} className="login user-form" onClick={e =>e.stopPropagation() }>
      <div className='form-title'>
        <h2>Log In</h2>
        <button className='close' onClick={handleClose}>&#x2715;</button>
    { loginErrors.length > 0 && <p className='login-errors'>{loginErrors}</p>}
      </div>
      <label>
        <p>username</p>
        <input
          type="text"
          placeholder="user-name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
          onKeyDown={onKeyDown}
      />
      </label>
    <label>
      <p>password</p>
      <input type="password"
        placeholder="password"
        min="1"
        value={password}
        onChange={updatePassword}
        onKeyDown={onKeyDown}
      />
    </label>
    <button type="submit">Submit</button>
    </form>
    </section>
  )
}




export default LoginForm;
