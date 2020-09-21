import { useEffect } from 'react'
import Router from 'next/router'

import { useRequest } from '../../hooks'

const Component = () => {
  const { doRequest } = useRequest({
    url: '/api/users/signout',
    method: 'post',
    body: {},
    onSuccess: () => Router.push('/'),
  })

  useEffect(() => {
    doRequest()
  })

  return <h1>Signing you out...</h1>
}

export default Component
