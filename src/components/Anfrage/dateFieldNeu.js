import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { de } from "date-fns/locale"
import { addDays, format } from "date-fns"
import Visa from "./visa"
import { useForm, Controller, useFormContext, FormProvider } from "react-hook-form"

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

const ConnectForm = ({ children }) => {
  const methods = useFormContext();
  
  return children({ ...methods });
 };

const DateFieldNeu = ({ name, label, placeholder, field, errors, onBlur }) => {
  const [begin, setBegin] = useState(new Date())
  const [weg, setWeg] = useState(new Date())

  const Difference_In_Time =
    addDays(new Date(weg), 1).getTime() - begin.getTime()

  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  const [state, setState] = useState([
    {
      startDate: addDays(new Date(), 5),
      endDate: addDays(new Date(), 15),
      key: "selection",
    },
  ])

  // const [focusedInput, setFocusedInput] = useState(null)

  const { control } = useForm()

  return (
    <InputWrapper>
          <DateRange
            id="myField"
            name="myField"
            value={state}
            selected={field.value}
            valueName="dates"
            defaultValue={state}
            locale={de}
            editableDateInputs={true}
            onChange={dates => {
              field.onChange(dates)
              field.onBlur(dates)
              setState([dates.selection])
              setBegin(dates.selection.startDate)
              setWeg(dates.selection.endDate)
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
            // focusedInput={focusedInput}
            // onFocusChange={focusedInput => setFocusedInput(focusedInput)}
          />
          {errors && <span>Start und Ende sollte schon nicht gleich sein du hirni</span>}


    </InputWrapper>
  )
}

export default DateFieldNeu
