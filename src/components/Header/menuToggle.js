import * as React from "react"
import styled from 'styled-components'

const Toggle = styled.div`
position: relative;
z-index: 999;
padding: 5px 20px 10px 20px;
margin-bottom: -15px;
@media(min-width: 1200px) {
    display: none;
}


span {
    display: block;
    height: 4px;
    background: var(--secondary);
    margin: 3px 0;
}

svg {
    height: 6px;
    display: block;
    margin: 4px auto;
}

svg path {
    /* fill: ${props => (props.light ? "#fff" : "var(--secondary)") || (props.scrolled ? "var(--secondary) !important" : "#fff")}; */
    fill: var(--secondary);
    fill: ${props => (props.light && !props.scrolled && "#fff") || (props.light && props.scrolled && "var(--secondary) !important")};
    transition: .4s all ease-out;
}

&.mob-nav-open svg path {
    fill: #fff !important;
}

.hamRight_band {
    opacity: 0;
    transition: .4s all ease-out;
}

.hamCenter, .hamRight, .hamLeft {
    transition: .4s all ease-out;
}

.hamRight {
    width: 100%;
    height: 40px;
    transform: translate(7px,-21px) rotate(-45deg);
}

.hamLeft {
    width: 100%;
    height: 40px;
    transform: translate(-8px,10px) rotate(45deg) scaleX(-1);
}

&.mob-nav-open .hamRight_band {
    opacity: 1;
}

&.mob-nav-open .hamRight {
    transform: translate(10px,-34px) rotate(0);
}

&.mob-nav-open .hamLeft {
    transform: translate(-6px,20px) rotate(0) scaleX(-1);
}

&.mob-nav-open .hamCenter {
    transform: translateX(100px);
    opacity: 0;
}
`

const MenuToggle = ({ clickHandler, open, light, scrolled }) => {

    return (
        <Toggle onClick={clickHandler} className={`${open ? "mob-nav-open" : "mob-nav-closed"}`} light={light} scrolled={scrolled}>
            <svg className="hamLeft" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.08 39.88"><path d="M37.08 32.84 4.72.47c-.83-.82-2.45-.54-3.62.63S-.35 3.89.47 4.72l32.37 32.36c.82.83 2.45.54 3.62-.62s1.45-2.8.62-3.62ZM6.69 3.86l1 1L3.9 6.73l-1-1ZM2.31 5.14l-1-1 3.8-1.86 1 1Zm6 .31 1 1-3.83 1.86-1-1ZM9.86 7l1 1-3.79 1.89-1-1Zm1.58 1.58 1 1-3.79 1.9-1-1ZM13 10.2l1 1-3.82 1.83-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1Zm1.58 1.59 1 1-3.76 1.86-1-1ZM17.78 15l1 1L15 17.81l-1-1Zm1.58 1.58 1 1-3.79 1.82-1-1ZM21 18.12l1 1L18.15 21l-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1Zm1.59 1.59 1 1-3.82 1.84-1-1Zm1.58 1.58 1 1-3.82 1.83-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1ZM28.87 26l1 1-3.8 1.9-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1ZM32 29.21l1 1-3.82 1.84-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1Zm1.58 1.59 1 1-3.82 1.84-1-1ZM1.6 1.6A1.79 1.79 0 0 1 4 1.18l.54.54L.9 3.48a2.13 2.13 0 0 1 .7-1.88Zm31.95 34.78L33 35.8l3.64-1.8a2.11 2.11 0 0 1-.64 2 1.8 1.8 0 0 1-2.45.38Z" /><path className="hamRight_band" d="M36.47 37.91a3.29 3.29 0 0 0 1 1.36 2.8 2.8 0 0 0 1.81.61c1.23 0 2.74-.6 4.75-2.06a8.84 8.84 0 0 0 2.45.4 6.37 6.37 0 0 0 4.29-1.74 20.3 20.3 0 0 0 4.34-6.26L54 29.67a19.1 19.1 0 0 1-4 5.89A5 5 0 0 1 46.44 37a6.26 6.26 0 0 1-1.2-.12c.63-.52 1.31-1.12 2-1.8a34.15 34.15 0 0 0 6.17-8.19l-1.08-.56s-.14.27-.42.75a33 33 0 0 1-5.51 7.11c-1 .93-1.88 1.68-2.67 2.29-.57-.19-1.15-.42-1.76-.66a20 20 0 0 0-5-1.47 7.47 7.47 0 0 1-.95 2.09 5.77 5.77 0 0 0 .45 1.47Zm5.1-1 1 .38a6.42 6.42 0 0 1-3.31 1.32 1.56 1.56 0 0 1-1-.33 2.69 2.69 0 0 1-.8-1.45 7.07 7.07 0 0 1-.17-1.27A19.78 19.78 0 0 1 41.57 37Z" /></svg>
            <svg className="hamCenter" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 6"><path d="M47.89 0H2.11C1 0 0 1.35 0 3s1 3 2.11 3h45.78C49.05 6 50 4.65 50 3s-.95-3-2.11-3Zm-42 1h1.47L6 5H4.5ZM3.72 5H2.26l1.41-4h1.45Zm4.43-4H9.6L8.2 5H6.74Zm2.24 0h1.45l-1.4 4H9Zm2.24 0h1.45l-1.4 4h-1.46Zm2.24 0h1.45l-1.4 4h-1.46Zm2.24 0h1.45l-1.4 4H15.7Zm2.24 0h1.45l-1.4 4h-1.46Zm2.24 0H23l-1.4 4h-1.42Zm2.24 0h1.45l-1.4 4h-1.46Zm2.24 0h1.45l-1.4 4h-1.45Zm2.24 0h1.45l-1.4 4h-1.45Zm2.24 0H32l-1.4 4h-1.45Zm2.24 0h1.45l-1.4 4h-1.45ZM35 1h1.45l-1.4 4h-1.42Zm2.24 0h1.45l-1.4 4h-1.42Zm2.24 0H41l-1.4 4h-1.49Zm2.24 0h1.48l-1.4 4h-1.45ZM44 1h1.45L44 5h-1.41Zm2.24 0h1.45l-1.4 4h-1.46ZM.7 3c0-1.1.64-2 1.41-2h.77L1.54 4.82A2.15 2.15 0 0 1 .7 3Zm47.19 2h-.82l1.35-3.85A2.13 2.13 0 0 1 49.3 3c0 1.1-.64 2-1.41 2Z" /></svg>
            <svg className="hamRight" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 55.08 39.88"><path d="M37.08 32.84 4.72.47c-.83-.82-2.45-.54-3.62.63S-.35 3.89.47 4.72l32.37 32.36c.82.83 2.45.54 3.62-.62s1.45-2.8.62-3.62ZM6.69 3.86l1 1L3.9 6.73l-1-1ZM2.31 5.14l-1-1 3.8-1.86 1 1Zm6 .31 1 1-3.83 1.86-1-1ZM9.86 7l1 1-3.79 1.89-1-1Zm1.58 1.58 1 1-3.79 1.9-1-1ZM13 10.2l1 1-3.82 1.83-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1Zm1.58 1.59 1 1-3.76 1.86-1-1ZM17.78 15l1 1L15 17.81l-1-1Zm1.58 1.58 1 1-3.79 1.82-1-1ZM21 18.12l1 1L18.15 21l-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1Zm1.59 1.59 1 1-3.82 1.84-1-1Zm1.58 1.58 1 1-3.82 1.83-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1ZM28.87 26l1 1-3.8 1.9-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1ZM32 29.21l1 1-3.82 1.84-1-1Zm1.58 1.58 1 1-3.82 1.84-1-1Zm1.58 1.59 1 1-3.82 1.84-1-1ZM1.6 1.6A1.79 1.79 0 0 1 4 1.18l.54.54L.9 3.48a2.13 2.13 0 0 1 .7-1.88Zm31.95 34.78L33 35.8l3.64-1.8a2.11 2.11 0 0 1-.64 2 1.8 1.8 0 0 1-2.45.38Z" /><path className="hamRight_band" d="M36.47 37.91a3.29 3.29 0 0 0 1 1.36 2.8 2.8 0 0 0 1.81.61c1.23 0 2.74-.6 4.75-2.06a8.84 8.84 0 0 0 2.45.4 6.37 6.37 0 0 0 4.29-1.74 20.3 20.3 0 0 0 4.34-6.26L54 29.67a19.1 19.1 0 0 1-4 5.89A5 5 0 0 1 46.44 37a6.26 6.26 0 0 1-1.2-.12c.63-.52 1.31-1.12 2-1.8a34.15 34.15 0 0 0 6.17-8.19l-1.08-.56s-.14.27-.42.75a33 33 0 0 1-5.51 7.11c-1 .93-1.88 1.68-2.67 2.29-.57-.19-1.15-.42-1.76-.66a20 20 0 0 0-5-1.47 7.47 7.47 0 0 1-.95 2.09 5.77 5.77 0 0 0 .45 1.47Zm5.1-1 1 .38a6.42 6.42 0 0 1-3.31 1.32 1.56 1.56 0 0 1-1-.33 2.69 2.69 0 0 1-.8-1.45 7.07 7.07 0 0 1-.17-1.27A19.78 19.78 0 0 1 41.57 37Z" /></svg>
        </Toggle>
    )

}

export default MenuToggle
