import React from "react"
import Select from "react-select"
import { Form, Field, ErrorMessage } from "formik"
import styled from "styled-components"

const Error = styled.div`
  position: absolute;
  left: 25px;
  color: red;
`

const SelectFieldd = ({ options, field, form ,setFieldValue, setFieldTouched, ...props }) => {
  return (
    <>
    <Select
      options={options}
      name={field.name}
      value={
        options ? options.find(option => option.value === field.value) : ""
      }
      onChange={option => 
        form.setFieldValue(field.name, option.value),
        form.setFieldTouched
      }
      // onBlur={field.onBlur}
      onBlur={() => setFieldTouched(field.name, true)}
      {...props}
    />
    <ErrorMessage name={field.name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
    </>
  )
}

export default SelectFieldd
