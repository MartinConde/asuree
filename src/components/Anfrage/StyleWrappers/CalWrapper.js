import styled from "styled-components"

const CalWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  font-size: 17px;

  @media(max-width: 1023px) {
    padding-bottom: 35px;
  }

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

  .DateRangePicker_picker {
    position: relative !important;
    top: auto !important;
  }

  .DateRangePicker_picker.DateRangePicker_picker_1.DateRangePicker_picker__directionLeft.DateRangePicker_picker__directionLeft_2
    div {
    background: transparent !important;
  }

  .DateRangePickerInput.DateRangePickerInput_1.DateRangePickerInput__showClearDates.DateRangePickerInput__showClearDates_2 {
    background-color: rgba(255, 255, 255, 0) !important;
    padding-right: 0 !important;
  }

  .DateInput.DateInput_1 {
    display: none;
  }

  .DateRangePicker_picker {
    background-color: transparent !important ;
  }

  .DayPicker {
    box-shadow: 8px 0 50px var(--seondary-trans);
  }

  .DateRangePickerInput_clearDates {
    position: absolute;
    top: 0;
  }

  li.DayPicker_weekHeader_li.DayPicker_weekHeader_li_1 small {
    font-size: 17px;
    margin-top: 15px;
    display: block;
  }

  .CalendarMonth_caption.CalendarMonth_caption_1 {
    padding-bottom: 60px;
  }

  .DateRangePickerInput_arrow {
    opacity: 0;
  }

  .calHeader {
    width: 100%;
  }

  @media (min-width: 768px) {
    .calHeader {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
  }

  .calHeader div {
    font-size: 22px;
    padding: 10px 20px;
    margin: 10px 0;
    transition: 0.3s all ease-out;
    box-shadow: 0 5px 10px rgba(0, 0, 51, 0.2);
    position: relative;
    z-index: 9;
    width: 100%;
  }

  @media (min-width: 768px) {
    .calHeader div {
      width: calc(50% - 44px);
      margin: 5px 22px;
    }
    .calHeader div:nth-child(2) {
    margin-right: 16px;
  }
  }

  

  .calHeader div:hover {
    cursor: pointer;
  }

  .calHeader div.active {
    background: var(--secondary);
    color: #fff;
  }

  .CalendarMonthGrid_month__hidden.CalendarMonthGrid_month__hidden_1 {
    display: none !important;
    height: 0 !important;
  }

  .DayPicker_transitionContainer.DayPicker_transitionContainer_1.DayPicker_transitionContainer__vertical.DayPicker_transitionContainer__vertical_2 {
    height: auto !important;
  }

  .DayPickerNavigation__verticalDefault {
    bottom: -50px;
  }

  .DayPickerNavigation_button__verticalDefault {
    padding: 0;
    box-shadow: none;
    border: none;
}
`

export default CalWrapper
