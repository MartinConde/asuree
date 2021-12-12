import React from "react"
import styled from "styled-components"
import { useForm } from 'react-hook-form';

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

  .indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--secondary-trans);
  }
`


export default function ImgRadio({ children, name, value, id, connector }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  return (
    <CustomRadio htmlFor={id} >
      <input {...register(connector, { required: true })} type="radio" name={name} value={value} id={id}/>
     {children}
     <div className="indicator">

     </div>
    </CustomRadio>
  )
}
