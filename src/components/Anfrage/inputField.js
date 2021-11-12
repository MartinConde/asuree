import React from "react"
import styled from "styled-components"
import { Field, ErrorMessage } from "formik"

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

  .floating__label::before,
  .floating__input:focus + .floating__label::before {
    transform: translate3d(0, -3.12rem, 0) scale3d(0.82, 0.82, 1);
  }

  .floating__input:focus + .floating__label::before {
    color: var(--primary);
  }
`

const Error = styled.div`
  position: absolute;
  left: 25px;
  color: red;
`

function InputField({
  name,
  label,
  placeholder,
  validator,
  valid,
  error,
  type,
  ...props
}) {
  return (
    <InputWrapper className={(valid && "valid") || (error && "error")}>
      <Field
        id={name}
        name={name}
        placeholder={placeholder}
        validate={validator}
        required
        type={type}
        className="floating__input"
        valid={valid}
        error={error}
        {...props}
      />
      <label htmlFor={name} className="floating__label" data-content={label}>
        <span className="hidden--visually">{label}</span>
      </label>
      <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
    </InputWrapper>
  )
}

export default InputField
