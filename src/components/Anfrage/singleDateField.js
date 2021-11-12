import React, { useState } from "react"
import styled from "styled-components"
import { useField, ErrorMessage } from "formik"
import Select, { Option, ReactSelectProps, createFilter } from "react-select"

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  > div {
    width: 25%;
  }

  font-size: 17px;

  .rdrMonthAndYearPickers {
    font-size: 20px;
  }

  .rdrMonthName,
  .rdrDay {
    font-size: 16px;
  }

  .rdrDayPassive {
    opacity: 0;
  }

  .searchSelect {
    display: block;
    width: calc(50% - 1px);
  }
`

const Label = styled.div`
color: var(--secondary);
border-bottom: 1px solid var(--secondary);
padding: 11px 25px 11px 25px;
`

const days = [
  { value: "01", label: "01" },
  { value: "02", label: "02" },
  { value: "03", label: "03" },
  { value: "04", label: "04" },
  { value: "05", label: "05" },
  { value: "06", label: "06" },
  { value: "07", label: "07" },
  { value: "08", label: "08" },
  { value: "09", label: "09" },
  { value: "10", label: "10" },
  { value: "11", label: "11" },
  { value: "12", label: "12" },
  { value: "13", label: "13" },
  { value: "14", label: "14" },
  { value: "15", label: "15" },
  { value: "16", label: "16" },
  { value: "17", label: "17" },
  { value: "18", label: "18" },
  { value: "19", label: "19" },
  { value: "20", label: "20" },
  { value: "21", label: "21" },
  { value: "22", label: "22" },
  { value: "23", label: "23" },
  { value: "24", label: "24" },
  { value: "25", label: "25" },
  { value: "26", label: "26" },
  { value: "27", label: "27" },
  { value: "28", label: "28" },
  { value: "29", label: "29" },
  { value: "30", label: "30" },
  { value: "31", label: "31" },
]

const months = [
  { value: "Januar", label: "Januar" },
  { value: "Februar", label: "Februar" },
  { value: "März", label: "März" },
  { value: "April", label: "April" },
  { value: "Mai", label: "Mai" },
  { value: "Juni", label: "Juni" },
  { value: "Juli", label: "Juli" },
  { value: "August", label: "August" },
  { value: "September", label: "September" },
  { value: "Oktober", label: "Oktober" },
  { value: "November", label: "November" },
  { value: "Dezember", label: "Dezember" },
]

const rangeOfYears = (start, end) =>
  Array(end - start + 1)
    .fill(start)
    .map((year, index) => year + index)

const allyears = rangeOfYears(1950, 2005)

const years = allyears.map(year => {
  return { value: year, label: year }
})

const customStyles = {
  control: base => ({
    ...base,
    height: 48,
    boxShadow: "none",
    borderColor: "var(--secondary)",
    borderWidth: "0 0 1px 0",
    borderRadius: "0",
    "&:hover": { borderColor: "var(--primary)" },
  }),
  option: styles => ({
    ...styles,
    height: 48,
    display: "flex",
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

const SingleDateField = ({ name, label, placeholder, validator, ...props }) => {
  const [bday, setBday] = useState()

  const [focusedInput, setFocusedInput] = useState(null)

  const [field, meta, helpers] = useField('tag')
  const [field2, meta2, helpers2] = useField('monat')
  const [field3, meta3, helpers3] = useField('jahr')
  const { value } = meta
  const { setValue, setTouched } = helpers

  return (
    <InputWrapper>
      <Label>Geburtstag:</Label>

      <Select
        {...field}
        {...props}
        options={days}
        onChange={optionSelected => {
          setValue(field, optionSelected.value)
          setTouched("tag", true, true)
        }}
        name="tag"
        validate={validator}
        required
        styles={{ indicatorSeparator: () => {}, ...customStyles }}
        className="searchSelect"
        placeholder="Tag"
        value={days.label}
      />

      <Select
        {...field2}
        {...props}
        required
        options={months}
        onChange={optionSelected => {
          setValue(optionSelected.value, true)
          setTouched("monat", true, true)
        }}
        name="monat"
        validate={validator}
        styles={{ indicatorSeparator: () => {}, ...customStyles }}
        className="searchSelect"
        placeholder="Monat"
        value={months.label}
      />

      <Select
        {...field3}
        {...props}
        required
        options={years}
        onChange={optionSelected => {
          setValue(optionSelected.value, true)
          setTouched("jahr", true, true)
        }}
        name="jahr"
        validate={validator}
        styles={{ indicatorSeparator: () => {}, ...customStyles }}
        className="searchSelect"
        placeholder="Jahr"
        value={years.label}
      />

      <ErrorMessage name="tag">{msg => <div>{msg}</div>}</ErrorMessage>
    </InputWrapper>
  )
}

export default SingleDateField
