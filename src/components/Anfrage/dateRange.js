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
import { DateRangePicker } from "react-dates"
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

const DateRangeField = ({ errors }) => {
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focusedInput, setFocusedInput] = useState()

  const Difference_In_Time =
    addDays(new Date(endDate), 1).getTime() - new Date(startDate).getTime()

  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  return (
    <InputWrapper>
      <DateRangePicker
        startDate={startDate}
        startDateId="start-date"
        endDate={endDate}
        endDateId="end-date"
        onDatesChange={({ startDate, endDate }) => {
          setStartDate(startDate)
          setEndDate(endDate)
        }}
        focusedInput={focusedInput}
        onFocusChange={focusedInput => setFocusedInput(focusedInput)}
        numberOfMonths={2}
        hideKeyboardShortcutsPanel
        daySize={60}
        showClearDates
        reopenPickerOnClearDates
        startDatePlaceholderText="Ankunft"
        endDatePlaceholderText="Abreise"
      />
      {errors && (
        <span>Start und Ende sollte schon nicht gleich sein du hirni</span>
      )}
    </InputWrapper>
  )
}

export default DateRangeField
