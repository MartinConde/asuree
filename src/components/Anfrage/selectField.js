import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Select, { Option, ReactSelectProps, createFilter } from "react-select"
import { useField, ErrorMessage } from "formik"
import countries from "../../static/countries.json"

const SelectWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-top: -1px;

  .landSelect {
    width: 60%;
  }
`

const Error = styled.div`
  position: absolute;
  left: 25px;
  color: red;
`

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    boxShadow: "none",
    borderColor: "var(--secondary)",
    borderWidth: "0 0 1px 0",
    borderRadius: "0",
    color: "red",
    "&:hover": { borderColor: "var(--primary)" },
  }),
  option: styles => ({
    ...styles,
    height: 50,
    display: "flex",
    color: "red",
    alignItems: "center",
  }),
  placeholder: defaultStyles => {
    return {
      ...defaultStyles,
      color: "var(--secondary)",
      paddingLeft: "20px",
    }
  },
  singleValue: styles => ({
    ...styles,
    color: "var(--secondary)",
    paddingLeft: "20px",
  }),
}

const Label = styled.div`
  color: var(--secondary);
  border-bottom: 1px solid var(--secondary);
  padding: 11px 25px 11px 25px;
  width: 40%;
`

export default function SelectField({
  name,
  validator,
  valid,
  error,
  ...props
}) {
  const [country, setCountry] = useState()

  const countryList = countries.map(function (e) {
    return { value: e.name, label: e.name, code: e.alpha_2 }
  })

  const filterConfig = {
    ignoreAccents: false,
  }

  const [field, meta, helpers] = useField(name)
  const { value } = meta
  const { setValue, setTouched } = helpers

  return (
    <SelectWrapper>
      <Label>Adresse:</Label>
      <Select
        {...field}
        {...props}
        required
        placeholder="Land"
        styles={{ indicatorSeparator: () => {}, ...customStyles }}
        options={countryList}
        onChange={optionSelected => {
          setCountry(optionSelected)
          setValue(optionSelected.value, true)
          setTouched(name, true, true)
        }}
        filterOption={createFilter(filterConfig)}
        name={name}
        value={country}
        validate={validator}
        className="landSelect"
      />
      <ErrorMessage name={name}>{msg => <Error>{msg}</Error>}</ErrorMessage>
    </SelectWrapper>
  )
}
