import React, { Suspense, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./Header/header"
import "./layout.css"



const LazyFooter = React.lazy(() => import('./Footer/footer'))

const Layout = ({ children, light }) => {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 200)
    })
    return function cleanup() {
      setScroll(true)
    }
  }, [])
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header light={light} siteTitle={data.site.siteMetadata?.title || `Title`} />
      <div>
        <main>{children}</main>
        {typeof window !== 'undefined' && (
            
            <Suspense fallback={<div>Loading..</div>}>
              {scroll &&
              <LazyFooter />
            }
            </Suspense>
            
          )}
      </div>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
