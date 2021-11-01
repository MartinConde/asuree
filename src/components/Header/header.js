import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from 'styled-components'
import { Link } from "gatsby"
import Menu from './menu'
import Logo from "./logo"

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;

  &.scrolled-nav {
    background: #fff;
    box-shadow: 8px 0 50px rgba(0,0,51,0.5);
  }

  @media (min-width: 1200px) {
    &.scrolled-nav svg {
      height: 60px;
    }
  }
`

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media(min-width: 1200px) {
    justify-content: flex-start;
  }
`

const Header = ({light}) => {
  const [scroll, setScroll] = useState(false)

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScroll(window.scrollY > 80)
    })
    return function cleanup() {
      setScroll(true)
    }
  }, [])

  return (
    <HeaderWrapper className={`${scroll ? "scrolled-nav" : "not-scrolled"}`}>
      <HeaderContent>
        <Link to="/">
          <Logo />
        </Link>
        <Menu light={light}/>
      </HeaderContent>
    </HeaderWrapper>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
