import React from "react"
import styled from "styled-components"
import { Field } from "formik"

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

export default function Visa({ days }) {
  return (
    <>
      {days > 30 ? (
        <VisaCheck>
          <p className="visaStatus">
            N richtig harter wa, {days} Tage willste bleiben. Voll
            geil aber ab 30 Tagen brauchst du ein Visum. Wir helfen dir da
            jerne.
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
    </>
  )
}
