import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { DateRange } from "react-date-range"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { de } from "date-fns/locale"
import { addDays, format } from "date-fns"
import Visa from "./visa"
import {
  useForm,
  Controller,
  useFormContext,
  FormProvider,
} from "react-hook-form"
import { SingleDatePicker } from "react-dates"
import moment from "moment"
import "moment/locale/de"

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 17px;

  /* .DayPicker.DayPicker_1.DayPicker__horizontal.DayPicker__horizontal_2.DayPicker__withBorder.DayPicker__withBorder_3,
  .DayPicker.DayPicker_1.DayPicker__horizontal.DayPicker__horizontal_2.DayPicker__withBorder.DayPicker__withBorder_3 > div > div {
    width: 800px !important;
} */

  td.CalendarDay {
    padding: 0;
  }

  td:empty {
    border: none;
  }

  // Will edit everything selected including everything between a range of dates
  .CalendarDay__selected_span {
    background: var(--secondary); //background
    color: white; //text
    border: 1px solid var(--secondary); //default styles include a border
  }

  // Will edit selected date or the endpoints of a range of dates
  .CalendarDay__selected {
    background: var(--primary);
    color: white;
  }

  // Will edit when hovered over. _span style also has this property
  .CalendarDay__selected:hover,
  .CalendarDay__selected_span:active,
  .CalendarDay__selected_span:hover {
    background: var(--primary);
    color: white;
  }

  // Will edit when the second date (end date) in a range of dates
  // is not yet selected. Edits the dates between your mouse and said date
  .CalendarDay__hovered_span:hover,
  .CalendarDay__hovered_span {
    background: var(--primary);
    color: white;
  }

  .DateInput_input__focused {
    border-color: var(--primary);
  }
`

const BirthDay = ({ errors }) => {
  const [bday, setBday] = useState(moment())
  const [focusedInput, setFocusedInput] = useState()

  const renderMonthElement = ({ month, onMonthSelect, onYearSelect }) => {
    let i
    let years = []
    for (i = moment().year() - 16; i >= moment().year() - 100; i--) {
      years.push(
        <option value={i} key={`year-${i}`}>
          {i}
        </option>
      )
    }
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <select
            value={month.month()}
            onChange={e => onMonthSelect(month, e.target.value)}
          >
            {moment.months().map((label, value) => (
              <option value={value} key={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select
            value={month.year()}
            onChange={e => onYearSelect(month, e.target.value)}
          >
            {years}
          </select>
        </div>
      </div>
    )
  }

  return (
    <InputWrapper>
      <SingleDatePicker
        date={bday}
        onDateChange={bday => setBday( bday )}
        focused={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        renderMonthElement={renderMonthElement}
        numberOfMonths={1}
        hideKeyboardShortcutsPanel
        daySize={60}
        showClearDates
        displayFormat={() => "DD.MM.YYYY"}
      />

      {/* {errors && (
        <span>Start und Ende sollte schon nicht gleich sein du hirni</span>
      )} */}
    </InputWrapper>
  )
}

export default BirthDay
