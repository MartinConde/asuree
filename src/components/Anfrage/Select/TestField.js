import React from "react"
import SelectFieldd from "./SelectFieldd"
import { Field, ErrorMessage } from "formik"
import styled from "styled-components"

const options = [
  { value: "foo", label: "Foo" },
  { value: "bar", label: "Bar" },
]

const Error = styled.div`
  position: absolute;
  left: 25px;
  color: red;
`

const TestField = ({ name, valid, error, validator }) => {
  return (
    <>
      <Field
        name={name}
        validate={validator}
        valid={valid}
        error={error}
        component={SelectFieldd}
        options={options}
      />
      
    </>
  )
}

export default TestField
