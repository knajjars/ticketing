import { useState } from 'react'
import Router from 'next/router'

import { useRequest } from '../../hooks'

const Component = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { doRequest } = useRequest({
    url: '/api/users/signin',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  })

  const runSubmit = (event) => {
    event.preventDefault()
    doRequest()
  }

  return (
    <form onSubmit={runSubmit}>
      <h1>Sign In</h1>
      <div className="form-group">
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          className="form-control"
        ></input>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="form-control"
        ></input>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Component
