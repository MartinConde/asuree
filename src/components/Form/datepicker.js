import React, { useState, useEffect } from "react"
import styled from "styled-components"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file
import { DateRange } from "react-date-range"
import { de } from "date-fns/locale"
import { addDays, format } from "date-fns"
import { Field } from "formik"

const CalWrapper = styled.div`
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
`

const CalHeader = styled.div`
  display: flex;
  border: 1px solid var(--secondary);

  > div {
    padding: 8px 12px;
    margin: 5px;
  }
`

const VisaCheck = styled.div`
margin-top: 20px;
text-align: center;

p {
  margin-bottom: 15px;
}
  label {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    margin-bottom: 12px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  /* Hide the browser's default checkbox */
  label input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: relative;
    height: 25px;
    width: 25px;
    margin-right: 15px;
    background-color: #eee;
  }

  /* On mouse-over, add a grey background color */
  label:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  label input:checked ~ .checkmark {
    background-color: #2196f3;
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  label input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  label .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`

const DatePickerWithFormik = ({
  startDateId,
  endDateId,
  form: { setFieldValue, setFieldTouched, values },
  field,
  ...props
}) => {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ])
  const [focusedInput, setFocusedInput] = useState(null)
  const [begin, setBegin] = useState(new Date())
  const [weg, setWeg] = useState(new Date())
  const [dauer, setDauer] = useState(null)

  const [open, setOpen] = useState(true)

  // To calculate the time difference of two dates
  const Difference_In_Time =
    addDays(new Date(weg), 1).getTime() - begin.getTime()

  // To calculate the no. of days between two dates
  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  useEffect(() => {
    setFieldValue("start", begin)
    setFieldValue("end", weg)
    setFieldValue("dauer", Difference_In_Days)
  }, [begin, weg])

  // console.log(begin)
  // console.log(weg)

  return (
    <CalWrapper>
      <CalHeader
        onClick={() => {
          setOpen(!open)
        }}
      >
        <div>
          {" "}
          Ankunft:{" "}
          {begin &&
            format(new Date(state[0].startDate), "dd MMMM yyyy", {
              locale: de,
            })}
        </div>
        <div>
          {" "}
          Abreise:{" "}
          {weg &&
            format(new Date(state[0].endDate), "dd MMMM yyyy", { locale: de })}
        </div>
      </CalHeader>
      {open && (
        <DateRange
          locale={de}
          editableDateInputs={true}
          onChange={item => {
            setState([item.selection])
            setBegin(addDays(new Date(item.selection.startDate), 1))
            setWeg(addDays(new Date(item.selection.endDate), 1))
            JSON.stringify(item.selection.startDate) ===
            JSON.stringify(item.selection.endDate)
              ? setOpen(true)
              : setOpen(false)
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
      )}
      {Difference_In_Days > 30 ? (
        <VisaCheck>
          <p className="visaStatus">
            N richtig harter wa, {Difference_In_Days} Tage willste
            bleiben. Voll geil aber ab 30 Tagen brauchst du ein Visum. Wir
            helfen dir da jerne.
          </p>

          <label>
            <Field
              type="checkbox"
              name="toggle"
              value={true ? "jap" : "nope"}
            />
            <span class="checkmark"></span>
            <span>Ja, ich möchte das ihr mir mit dem Visum helft</span>
          </label>
        </VisaCheck>
      ) : null}
    </CalWrapper>
  )
}

export default DatePickerWithFormik
