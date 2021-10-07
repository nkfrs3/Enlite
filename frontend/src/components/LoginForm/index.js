import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../store/session';


  const LoginForm = ({setShowLogin}) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const updateEmail = e => setEmail(e.target.value);
  const updatePassword = e => setPassword(e.target.value)
  const handleClose = e => {e.preventDefault(); setShowLogin(false)}
  const handleSubmit = async(e) => {
    e.preventDefault();
    let payload = {};
     payload['credential'] = userName;
     payload['password'] = password;
    console.log(payload);
    const user = await dispatch(login(payload));
    if (user){
      setShowLogin(false);
    }
    setShowLogin(false)
  }

  return (
    <section >
    <form onSubmit={handleSubmit} className="login" onClick={e =>e.stopPropagation() }>
      <div className='form-title'>
        <h2>Log In</h2>
        <button className='close' onClick={handleClose}>&#x2715;</button>
      </div>
      <label>
        <p>username</p>
        <input
          type="text"
          placeholder="user-name"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
      />
      </label>
    <label>
      <p>password</p>
      <input type="password"
        placeholder="password"
        min="1"
        value={password}
        onChange={updatePassword}
      />
    </label>
    <button type="submit">Submit</button>
    </form>
    </section>
  )
}




export default LoginForm;
