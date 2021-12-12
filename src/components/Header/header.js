import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import { Link } from "gatsby"
import Menu from "./menu"
import Logo from "./logo"

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  max-width: 100vw;

  &.scrolled-nav {
    background: #fff;
    box-shadow: 8px 0 50px rgba(0, 0, 51, 0.5);
  }

  a svg {
    height: 50px;
  }

  @media (min-width: 1200px) {
    a svg {
      height: 65px;
    }

    a {
      will-change: transform;
      transform: scale(1);
      transition: 0.3s all ease-out;
    }

    &.scrolled-nav a {
      transform: scale(0.8);
    }

    &.scrolled-nav a {
      color: var(--secondary);
      text-shadow: none;
    }
    &.scrolled-nav a:hover,
    &.scrolled-nav a.active {
      color: var(--primary);
    }
  }
`

const HeaderContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: space-between;
  align-items: center;
  justify-items: center;
  width: 100%;
  margin: 0 auto;

  a {
    justify-self: start;
    margin-left: 20px;
    margin-bottom: -8px;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 1fr 3fr 1fr;

    a {
      margin-left: 20px;
      margin-bottom: 0;
      padding: 10px 20px 5px 20px;
    }
  }
`

const Header = ({ light }) => {
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
          <Logo scrolled={scroll} />
        </Link>
        <Menu light={light} scrolled={scroll} />
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
