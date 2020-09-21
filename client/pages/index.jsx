import { buildClient } from '../api'

const LandingPage = ({ currentUser }) => {
  return currentUser ? <h1>You are signed in</h1> : <h1>You are signed out</h1>
}

LandingPage.getInitialProps = async ({ req }) => {
  const response = await buildClient(req).get('api/users/currentuser')
  return response.data
}

export default LandingPage
