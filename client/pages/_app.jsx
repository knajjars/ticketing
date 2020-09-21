import 'bootstrap/dist/css/bootstrap.css'

import { HeaderComponent } from '../components'
import { buildClient } from '../api'

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <>
      <HeaderComponent currentUser={currentUser} />
      <div className="container">
        <Component {...pageProps} />
      </div>
    </>
  )
}

AppComponent.getInitialProps = async (appContext) => {
  const { data } = await buildClient(appContext.ctx.req).get(
    'api/users/currentuser'
  )

  let pageProps = {}
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx)
  }

  return { ...data, pageProps }
}

export default AppComponent
