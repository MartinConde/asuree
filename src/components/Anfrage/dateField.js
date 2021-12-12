import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { useField, ErrorMessage } from "formik"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { de } from "date-fns/locale"
import { addDays, format } from "date-fns"
import Visa from "./visa"

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

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
`

// function validateDate(meta) {
//   let error
//   if (meta.value) {
//     error = "Brooch ick"
//   }
//   return error
// }

const DateField = ({ name, label, placeholder, ...props }) => {
  // const [begin, setBegin] = useState(new Date())
  // const [weg, setWeg] = useState(new Date())

  // const Difference_In_Time =
  //   addDays(new Date(weg), 1).getTime() - begin.getTime()

  // const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  // const [state, setState] = useState([
  //   {
  //     startDate: new Date(),
  //     endDate: new Date(),
  //     key: "selection",
  //   },
  // ])

  // const [focusedInput, setFocusedInput] = useState(null)

  // const [field, meta, helpers] = useField(name)
  // const { value } = meta
  // const { setValue, setTouched } = helpers

  return (
    <InputWrapper>
      {/* <DateRange
        id={name}
        name={name}
        value={state}
        // validate={validateDate}
        {...field}
        {...props}
        locale={de}
        editableDateInputs={true}
        selected={(field.value && new Date(field.value)) || null}
        onChange={val => {
          setState([val.selection])
          setValue(val.selection, true)
          setBegin(val.selection.startDate)
          setWeg(val.selection.endDate)
          setTouched(name, true, true)
        }}
        moveRangeOnFirstSelection={false}
        ranges={state}
        months={2}
        direction="horizontal"
        dateDisplayFormat="dd MMMM yyyy"
        monthDisplayFormat="MMMM yyyy"
        color="#fff"
        showDateDisplay={false}
        minDate={new Date()}
        maxDate={addDays(new Date(), 1000)}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
      />
      <label htmlFor={name} className="floating__label" data-content={label}>
        <span className="hidden--visually">{label}</span>
      </label>
      <ErrorMessage name={name}>{msg => <div>{msg}</div>}</ErrorMessage>
      <Visa days={Difference_In_Days} /> */}
    </InputWrapper>
  )
}

export default DateField
