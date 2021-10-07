import { useState } from "react";
import './SignUpForm.css'

const SignUpForm = ({setShowSignUp}) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationErrors, setValidationErrors] = useState([])
  const handleClose = e => {e.preventDefault(); setShowSignUp(false)};

    const handleSubmit = e => {
      e.preventDefault();
    }
  return (
    <section >
    <form onSubmit={handleSubmit} className="sign-up user-form" onClick={e => e.stopPropagation() }>
      <div className='form-title'>
        <h2>Sign Up</h2>
        <button className='close' onClick={handleClose}>&#x2715;</button>
    { validationErrors.map(err => <p>{err}</p>)}
      </div>
      <label>
        <p>username</p>
        <input
          type="text"
          placeholder="user-name"
          onChange={(e) => setName(e.target.value)}
          value={name}
      />
      </label>
      <label>
        <p>email</p>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
      />
      </label>
    <label>
      <p>password</p>
      <input type="password"
        placeholder="password"
        min="1"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
    </label>
    <label>
      <p>confirm password</p>
      <input type="password"
        placeholder="password"
        min="1"
        value={confirmPassword}
        onChange={e=>setConfirmPassword(e.target.value)}
      />
    </label>
    <button type="submit">Submit</button>
    </form>
    </section>
  )
}


export default SignUpForm;
