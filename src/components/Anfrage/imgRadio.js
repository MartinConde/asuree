import React from "react"
import styled from "styled-components"
import { Field } from "formik"

const CustomRadio = styled.label`
  margin: 20px;

  [type="radio"] {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* IMAGE STYLES */
  [type="radio"] + div {
    cursor: pointer;
  }

  /* CHECKED STYLES */
  [type="radio"]:checked + div {
    outline: none;
    background: var(--primary);
  }
`

export default function ImgRadio({ children, name, value }) {
  return (
    <CustomRadio>
      <Field type="radio" name={name} value={value} />
     {children}
    </CustomRadio>
  )
}
