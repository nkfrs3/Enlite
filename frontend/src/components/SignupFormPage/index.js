import { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/session";
import './SignUpForm.css'

const SignUpForm = ({setShowSignUp}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const handleClose = e => {e.preventDefault(); setShowSignUp(false)};

    const dispatch = useDispatch()

    const onKeyDown = e => {
      if (e.key == 'Enter'){
      handleSubmit(e);
    }}
    const handleSubmit = async e => {
      e.preventDefault();
      const formData = {username: name, email, password, confirmPassword};
      if (password !== confirmPassword){
        setValidationErrors(prev => [...prev, 'passwords must match'])
      } else {
        const res = await dispatch(signUp(formData));
        if (res.id){
          setShowSignUp(false);
        }
        else {
          console.log('sign-up error');
          setValidationErrors(prev => [...prev, ...res]);
        }
      }

    }
  return (
    <section >
    <form onSubmit={handleSubmit} className="sign-up user-form" onClick={e => e.stopPropagation() }>
      <div className='form-title' >
        <h2>Sign Up</h2>
        <button className='close' onClick={handleClose}>&#x2715;</button>
    { validationErrors.map(err => <p className='err'>{err}</p>)}
      </div>
      <label>
        <p>username</p>
        <input
          type="text"
          placeholder="user-name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          onKeyDown={onKeyDown}
      />
      </label>
      <label>
        <p>email</p>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          onKeyDown={onKeyDown}
      />
      </label>
    <label>
      <p>password</p>
      <input type="password"
        placeholder="password"
        min="1"
        value={password}
        onChange={e => setPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </label>
    <label>
      <p>confirm password</p>
      <input type="password"
        placeholder="password"
        min="1"
        value={confirmPassword}
        onChange={e=>setConfirmPassword(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </label>
    <button type="submit">Submit</button>
    </form>
    </section>
  )
}


export default SignUpForm;
