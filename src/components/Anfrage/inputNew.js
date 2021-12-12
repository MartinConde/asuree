import React from "react"
import styled from "styled-components"

const InputWrapper = styled.div`
  position: relative;
  width: 100%;

  .floating__input {
    padding: 15px 25px 5px 25px;
    border: none;
    border-bottom: 2px solid var(--secondary);
    transition: border-color 0.2s ease;
    caret-color: var(--primary);
    width: 100%;
  }

  .floating__input::-moz-placeholder {
    color: rgba(0, 0, 0, 0);
  }

  .floating__input:-ms-input-placeholder {
    color: rgba(0, 0, 0, 0);
  }

  .floating__input::placeholder {
    color: rgba(0, 0, 0, 0);
  }

  .floating__label {
    display: block;
    position: relative;
    max-height: 0;
    pointer-events: none;
  }

  .floating__label::before {
    color: var(--secondary);
    content: attr(data-content);
    display: inline-block;
    filter: blur(0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    transform-origin: left top;
    transition: transform 0.2s ease;
    left: 25px;
    position: relative;
  }

  .floating__input:focus-visible {
    outline: none;
  }

  .floating__input:focus + .floating__label::after {
    transform: scale3d(1, 1, 1);
    opacity: 1;
  }

  .floating__input:-moz-placeholder-shown + .floating__label::before {
    transform: translate3d(0, -2.2rem, 0) scale3d(1, 1, 1);
  }

  .floating__input:-ms-input-placeholder + .floating__label::before {
    transform: translate3d(0, -2.2rem, 0) scale3d(1, 1, 1);
  }

  .floating__input:placeholder-shown + .floating__label::before {
    transform: translate3d(0, -2.2rem, 0) scale3d(1, 1, 1);
  }

  .floating__input.bday__input {
    text-transform: uppercase;
  }

  .floating__input.bday__input + .floating__label::before {
    transform: translate3d(0, -2.2rem, 0) scale3d(1,1,1);
  }

  .floating__label::before,
  .floating__input:focus + .floating__label::before,
  .floating__input.bday__input.has-value + .floating__label::before {
    transform: translate3d(0, -3.12rem, 0) scale3d(0.82, 0.82, 1);
  }

  .floating__input:focus + .floating__label::before {
    color: var(--primary);
  }
`



function InputFieldNew({
  children
}) {
  return (
    <InputWrapper>
     {children}
    </InputWrapper>
  )
}

export default InputFieldNew
