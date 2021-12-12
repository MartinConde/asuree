import React, { useState, useEffect } from "react"
import axios from "axios"
import "react-date-range/dist/styles.css" // main css file
import "react-date-range/dist/theme/default.css" // theme css file

import { useBreakpoint } from "gatsby-plugin-breakpoints"
import ReactInputDateMask from "react-input-date-mask"

import "react-dates/initialize"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Row from "../components/Blocks/row"
import AcomCard from "../components/DetailPages/acomCard"
import GymCard from "../components/gymCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageHeader from "../components/ImageHeader"
import Select, { Option, ReactSelectProps, createFilter } from "react-select"
import { useForm, Controller } from "react-hook-form"
import { ErrorMessage } from "@hookform/error-message"

import DateRangeField from "../components/Anfrage/dateRange"
import "react-dates/lib/css/_datepicker.css"
import InputFieldNew from "../components/Anfrage/inputNew"
import BirthDay from "../components/Anfrage/bday"
import { DateRangePicker, SingleDatePicker } from "react-dates"
import moment from "moment"
import "moment/locale/de"
import countries from "../static/countries.json"

import CalWrapper from "../components/Anfrage/StyleWrappers/CalWrapper"
import "../components/Anfrage/StyleWrappers/BdayPicker.css"
import {
  SectionWrapper,
  SectionContent,
  SectionTitle,
} from "../components/Anfrage/StyleWrappers/SectionWrapper"
import BdaySelect from "../components/Anfrage/StyleWrappers/BdaySelect"
import Summary from "../components/Anfrage/summary"
import { VisaCheck } from "../components/Anfrage/StyleWrappers/VisaWrapper"
import SubmitButton from "../components/Blocks/submitButton"

const Section = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  /* background: var(--secondary-trans); */
  margin-bottom: 50px;
`

const AcomWrapper = styled.div`
  width: 100%;
  position: relative;
  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;

    label {
      width: calc(33.33% - 20px);
      display: flex;
      /* flex: 1; */
    }
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const PersonalFields = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`

const PersonalFieldsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-end;

  > div {
    position: relative;
    width: 100%;
    margin-bottom: 25px;
  }

  @media (min-width: 768px) {
    margin-bottom: 50px;

    > div {
      margin-bottom: 5px;
    }

    &.halfs > div {
      width: 50%;
    }

    &.triple > div {
      width: 33.3%;
    }
  }

  @media (max-width: 1199px) {
    .react-select__control--menu-is-open .react-select__value-container {
      position: fixed;
      top: 125px;
      left: 0;
      width: 100%;
      z-index: 999;
    }
    .react-select__menu {
      background: #fff;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      padding-top: 185px;
    }
  }
`

const CustomRadio = styled.label`
  margin: 10px;
  position: relative;
  display: block;

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
    /* background: var(--primary); */
  }

  .indicator {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: var(--secondary-trans);
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: 0.3s all ease-out;
    pointer-events: none;
  }

  .indicator svg {
    height: 80px;
  }

  [type="radio"]:checked ~ .indicator {
    opacity: 1;
  }
`

const ErrorWrapper = styled.div`
  position: absolute;
  bottom: 15px;
  left: 0;
  font-size: 16px;
  color: red;

  &.inputError {
    bottom: 0;
    left: 25px;
    transform: translateY(100%);
  }

  &.dateError {
    bottom: 0;
  }

  &.hotelError {
    bottom: 0;
    transform: translateY(100%);
    left: 10px;
  }

  @media (min-width: 768px) {
    bottom: 5px;
    font-size: 18px;

    &.dateError {
      bottom: 5px;
    }

    &.inputError {
      bottom: -5px;
    }
  }
`

const FormWrapper = styled.form`
  margin: 15px;
`

const AnfrageFormularNeu = ({ data }) => {
  const [gymData, setGymData] = useState()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [gymChosen, setGymChosen] = useState(false)
  const [token, setToken] = useState("") // store token
  const [isSuccessMessage, setIsSuccessMessage] = useState(false) // manage is success message state
  const [messageSent, setMessageSent] = useState(false) // manage sent message state
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [startDate, setStartDate] = useState()
  const [endDate, setEndDate] = useState()
  const [focusedInput, setFocusedInput] = useState("startDate")
  const [acomPreis, setAcomPreis] = useState()



  const [country, setCountry] = useState()

  const countryList = countries.map(function (e) {
    return { value: e.name, label: e.name, code: e.alpha_2 }
  })



  const breakpoints = useBreakpoint()

  const filterConfig = {
    ignoreAccents: false,
  }

  const {
    register,
    handleSubmit,
    onBlur,
    onTouched,
    watch,
    control,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
  })

  // const onSubmit = data => console.log(data)

  const onSubmit = data => {
    setIsSubmitting(true)
    const bodyFormData = new FormData()
    bodyFormData.set("gym", gymData.title)
    bodyFormData.set("fullName", data.Name)
    bodyFormData.set("your-name", data.Name)
    bodyFormData.set("your-subject", gymData.title)
    bodyFormData.set("email", data.Email)
    bodyFormData.set("plzort", data.PlzOrt)
    bodyFormData.set("land", data.Land)
    bodyFormData.set("geburtstag", data.Birthday)
    bodyFormData.set("unterkunft", data.Unterkunft)
    bodyFormData.set("anreise", data.Reisedaten.Ankunft)
    bodyFormData.set("abreise", data.Reisedaten.Abreise)
    bodyFormData.set(
      "visahilfe",
      data.Visahilfe ? "jap brauche hilfe" : "nö mach ick selber"
    )
    bodyFormData.set(
      "dauer",
      Math.abs(JSON.stringify(startDate && startDate.diff(endDate, "days"))) + 1
    )
    bodyFormData.set("unterkunft", data.Unterkunft)

    // bodyFormData.set("toggle", values.toggle)
    axios({
      method: "post",
      url: `https://wordpress-332056-1932566.cloudwaysapps.com/wp-json/contact-form-7/v1/contact-forms/418/feedback`,
      data: bodyFormData,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    })
      .then(response => {
        // actions taken when submission goes OK
        setIsSubmitting(false)
        setMessageSent(true)
        setIsSuccessMessage(true)
        console.log(response)
      })
      .catch(error => {
        // actions taken when submission goes wrong
        setIsSubmitting(false)
        setMessageSent(true)
        setIsSuccessMessage(false)
        console.log(error)
      })
  }

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
      color: "var(--secondary)",
      alignItems: "center",
    }),
    placeholder: defaultStyles => {
      return {
        ...defaultStyles,
        color: "var(--secondary)",
        paddingLeft: "15px",
      }
    },
    singleValue: styles => ({
      ...styles,
      color: "var(--secondary)",
      paddingLeft: "15px",
    }),
  }

  useEffect(() => {
    if (localStorage.getItem("gymData")) {
      setGymData(JSON.parse(localStorage.getItem("gymData")))
      setDataLoaded(true)
    }
  }, [gymChosen])

  useEffect(() => {
    axios({
      method: "post",
      url: `https://wordpress-332056-1932566.cloudwaysapps.com/wp-json/jwt-auth/v1/token`,
      data: {
        username: "admin@homepagelabor.ch",
        password: "mUTZ9Nyhgv",
      },
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(response => {
        setToken(response.data.token)
      })
      .catch(error => console.error("Error", error))
  }, [])

  const formDaten = watch("Reisedaten")
  const formUnterkunft = watch("Unterkunft")
  const formName = watch("Name")
  const formMail = watch("Email")
  const formBday = watch("Birthday")
  const formLand = watch("Land")
  const formPlzort = watch("PlzOrt")
  const visaFeld = watch("Visahilfe")

  const tagedauer = Math.abs(startDate && startDate.diff(endDate, "days")) + 1

  const Difference_In_Time =
    formDaten &&
    new Date(formDaten.Abreise).getTime() -
      new Date(formDaten.Ankunft).getTime()

  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  return (
    <Layout light={data.wpPage.ACF_Global.lightHeader}>
      <ImageHeader
        image={data.wpPage.featuredImage.node.localFile}
        imagealt={data.wpPage.featuredImage.node.altText}
        title={`${dataLoaded ? "Anfrage " + gymData.title : "Anfrage stellen"}`}
        light={data.wpPage.ACF_Global.lightHeader}
      />
      {dataLoaded ? (
        !messageSent ? (
        <>
          
            <FormWrapper onSubmit={handleSubmit(onSubmit)}>
              <SectionWrapper>
                <SectionTitle>Wähle deine Reisedaten</SectionTitle>

                <SectionContent>
                  <CalWrapper>
                    <div className="calHeader">
                      <div
                        onClick={() => setFocusedInput("startDate")}
                        className={
                          focusedInput === "startDate" ? "active" : "inactive"
                        }
                      >
                        {startDate
                          ? `Ankunft: ${moment(startDate).format(
                              "dddd, Do MMMM YYYY"
                            )}`
                          : "Anreisedatum wählen"}
                      </div>
                      <div
                        onClick={() => setFocusedInput("endDate")}
                        className={
                          focusedInput === "endDate" ? "active" : "inactive"
                        }
                      >
                        {endDate
                          ? `Abreise: ${moment(endDate).format(
                              "dddd, Do MMMM YYYY"
                            )}`
                          : "Abreisedatum wählen"}
                      </div>
                    </div>

                    <Controller
                      control={control}
                      name="Reisedaten"
                      // rules={{ validate: (value) => value !== null }}
                      rules={{ required: "This is required." }}
                      render={({ field }) => (
                        <DateRangePicker
                          startDate={startDate}
                          startDateId="start-date"
                          endDate={endDate}
                          endDateId="end-date"
                          onDatesChange={({ startDate, endDate }) => {
                            setStartDate(startDate)
                            setEndDate(endDate)
                            field.onChange({
                              Ankunft: moment(startDate).format(
                                "dddd, Do MMMM YYYY"
                              ),
                              Abreise: moment(endDate).format(
                                "dddd, Do MMMM YYYY"
                              ),
                            })
                          }}
                          valueName="selected"
                          focusedInput={focusedInput}
                          onFocusChange={focusedInput => {
                            if (!focusedInput) return
                            setFocusedInput(focusedInput)
                          }}
                          numberOfMonths={breakpoints.md ? 1 : 2}
                          hideKeyboardShortcutsPanel
                          daySize={
                            breakpoints.xxs ? 38 : breakpoints.xs ? 46 : breakpoints.sm ? 50 : breakpoints.mobBreak ? 65 : breakpoints.l ? 65 : 76
                          }
                          // showClearDates
                          reopenPickerOnClearDates
                          startDatePlaceholderText="Ankunft"
                          endDatePlaceholderText="Abreise"
                          displayFormat={() => "DD.MM.YYYY"}
                          keepOpenOnDateSelect
                          autoFocus
                          noBorder
                          orientation={
                            breakpoints.md ? "vertical" : "horizontal"
                          }
                          verticalSpacing={0}
                        />
                      )}
                    />
                    <ErrorWrapper className="dateError">
                      <ErrorMessage
                        as="span"
                        errors={errors}
                        name="Reisedaten"
                      />
                    </ErrorWrapper>
                  </CalWrapper>
                  {tagedauer > 30 ? (
                    <VisaCheck>
                      <p className="visaStatus">
                        N richtig harter wa, {tagedauer} Tage willste bleiben.
                        Voll geil aber ab 30 Tagen brauchst du ein Visum. Wir
                        helfen dir da jerne.
                      </p>

                      <label>
                        <input
                          {...register("Visahilfe")}
                          type="checkbox"
                          name="Visahilfe"
                          value={true ? "jap" : "nope"}
                        />
                        <span className="checkmark"></span>
                        <span>
                          Ja, ich möchte das ihr mir mit dem Visum helft
                        </span>
                      </label>
                    </VisaCheck>
                  ) : null}
                </SectionContent>
              </SectionWrapper>
              <SectionWrapper>
                <SectionTitle>Wähle deine Unterkunft</SectionTitle>
                <SectionContent>
                  <AcomWrapper>
                    {gymData.ACF_Gyms.accommodations.map(acom => {
                      return (
                        <CustomRadio htmlFor={acom.slug}>
                          <input
                            {...register("Unterkunft", {
                              required: "This is required.",
                            })}
                            type="radio"
                            name="Unterkunft"
                            value={acom.title}
                            id={acom.slug}
                            onClick={() => setAcomPreis(acom.ACF_Accommodations.preis)}
                          />
                          <AcomCard
                            anfrage
                            minimal
                            key={acom.title}
                            title={acom.title}
                            preis={acom.ACF_Accommodations.preis}
                            image={acom.featuredImage.node.localFile}
                            sterne={acom.ACF_Accommodations.sterne}
                          />
                          <div className="indicator">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 1200 1200"
                            >
                              <path
                                fill="#fff"
                                d="M361.13 921.48c-21.695-24.504-42.5-49.809-63.367-75.035-8.238-9.96-54.07-67.91-64.672-86.492-3.18-5.57-4.867-15.043-.504-16.773 18.5-7.336 26.148-20.996 46.496-33.914 20.914-13.27 32.914-13.27 48.238-28.68 8.676-8.59 13.664-4.121 17.055 1.156v.004a167.694 167.694 0 0 1 17.387 35.812 482.007 482.007 0 0 0 32.645 76.07 12.543 12.543 0 0 0 13.355-5.57c60.832-93.176 141.56-168.81 218.87-247.36 52.754-53.594 106.68-105.99 162.65-156.36 60.324-54.281 131.1-91.195 201.76-128.77 6.953-3.7 15.168-6.817 17.902 2.926 8.848 31.539 26.773 59.918 31.66 92.77 4.18 28.09.375 37.125-26.219 48.07-130.48 53.699-234.62 143.43-335.27 239.34a2346.799 2346.799 0 0 0-261.12 302.64 60.753 60.753 0 0 1-12.148 13.406c-6.727 4.859-33.234-20.29-44.71-33.25zm381.08-405.54a111.876 111.876 0 0 0 19.027-76.5c-58.82 38.812-76.355 69.078-65.609 113.68v-.004a300.75 300.75 0 0 0 23.902-45.28c7.2-12.77 4.371-32.806 24.902-39.349 3.867 16.363-7.66 29.152-2.223 47.453zM625.04 671.02c-33.938 11.906-52.758 39.012-72.875 63.938-19.492 24.152-45.426 44.172-52.699 77.406 41.855-47.113 83.715-94.227 125.57-141.34zm194.11-209.64a237.142 237.142 0 0 0 33.023-93.82c-28.375 19.973-36.012 41.449-33.023 93.82zm51.965-41.141c14.164-21.188 16.348-42.625 21.887-62.754v-.004a8.95 8.95 0 0 0-.195-7.016 8.945 8.945 0 0 0-5.196-4.722c-7.347-2.446-11.39 2.32-13.07 8.5-5.511 20.27-11.988 40.59-3.425 65.996zm91.848-121.39c-26.723 20.855-25.215 42.992-23.336 69.961 18.762-19.84 20.957-40.668 23.336-69.961zm-160.64 106.93a69.404 69.404 0 0 0-22.484 63.492 121.53 121.53 0 0 0 22.484-63.492zm-283.36 276.89c-7.55 26.578-22.371 51.121-21.094 79.766a198.827 198.827 0 0 0 21.094-79.766zm466.63-378.08a59.82 59.82 0 0 0-7.512 54.352c19.742-17.473 11.996-36.301 7.512-54.352zm-332.12 303.38c29.836-9.242 26.066-26.504 19.777-50.594l.004-.004a113.83 113.83 0 0 0-19.781 50.598zm-67.105 44.703c16.402-23.73 19.754-34.141 18.582-57.68-17.348 24.262-18.25 27.062-18.578 57.68zm56.375-65.617c8.836-13.328 20.312-25.547 16.164-45.008h.004a36.672 36.672 0 0 0-16.438 19.504 36.66 36.66 0 0 0 .273 25.504zm-297.78 206.88a73.303 73.303 0 0 0-2.394 43.949 29.306 29.306 0 0 0 2.395-43.95zm-24.52-48.23c-1.746 20.207-6.96 33.402.535 46.566 2.567-13.043 15.488-25.07-.535-46.566zm603.04-427.49c-10.746 18.48-18.008 30.777-11.594 49.211a64.344 64.344 0 0 0 11.594-49.211zm-86.793 143.67c19.059-14.891 19.059-14.891 11.203-36.746-3.965 13.004-7.23 23.711-11.203 36.746zm-469.55 401.71c8.992-11.254 13.281-20.492.71-32.332a29.588 29.588 0 0 0-.71 32.332zm30.332-20.477a36.376 36.376 0 0 0-9.95 17.172 36.37 36.37 0 0 0 .555 19.832c6.274-12.699 14.074-21.227 9.395-37.004zm391.43-339.88c14.82-8.047 13.934-17.195 8.508-28.461h-.004a30.94 30.94 0 0 0-8.504 28.461zm169.34-111.71c4.094-1.469 9.09-2.512 9.477-8.129.351-5.125-2.247-9.137-7.797-8.504-5.364.613-6.645 5.59-7.176 10.133-.422 3.598.797 6.582 5.496 6.5zm-295.29 244.29a54.825 54.825 0 0 0-30.277 22.641 44.046 44.046 0 0 0 30.277-22.641zm257.91-225.91c3.89.035 7.387-1.105 8.148-5.27l.004.004a7.702 7.702 0 0 0-7.293-10.136c-4.082-.207-4.691 4.36-5.488 7.62v-.003a5.845 5.845 0 0 0 .473 4.992 5.849 5.849 0 0 0 4.156 2.797zm-475.46 422.6c-8.96 2.59-9.855 7.207-9.309 11.918.309 2.656-.03 8.082 5.801 4.96h.004a10.852 10.852 0 0 0 7.164-10.897c-.441-3.813-2.68-6.219-3.66-5.98zm-99.113-101.48a17.123 17.123 0 0 0-10.914-12.688c-1.77-.559-6.082 1.055-6.164 1.957-.79 8.578 5.02 12.527 12.074 14.844.984.32 2.957-2.367 5.004-4.113z"
                              />
                            </svg>
                          </div>
                        </CustomRadio>
                      )
                    })}
                    <ErrorWrapper className="hotelError">
                      <ErrorMessage
                        as="span"
                        errors={errors}
                        name="Unterkunft"
                      />
                    </ErrorWrapper>
                  </AcomWrapper>
                </SectionContent>
              </SectionWrapper>

              <SectionWrapper>
                <SectionTitle>Persönliche Angaben</SectionTitle>

                <SectionContent>
                  <PersonalFieldsRow className="triple">
                    <InputFieldNew>
                      <input
                        id="name"
                        name="name"
                        placeholder="Hans Dampf"
                        type="text"
                        className="floating__input"
                        {...register("Name", {
                          required:
                            "Soll ick dich einfach Kevin nennen oder wat",
                        })}
                      />
                      <label
                        htmlFor="name"
                        className="floating__label"
                        data-content="Name"
                      >
                        <span className="hidden--visually">Name</span>
                      </label>
                      <ErrorWrapper className="inputError">
                        <ErrorMessage as="span" errors={errors} name="Name" />
                      </ErrorWrapper>
                    </InputFieldNew>

                    <InputFieldNew>
                      <input
                        id="email"
                        name="email"
                        placeholder="hans@dampf.ch"
                        type="email"
                        className="floating__input"
                        {...register("Email", {
                          required: "Ne mail brooch ick schon..",
                          pattern: {
                            value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                            message: "Dit is keine gueltige mail du holz", // JS only: <p>error message</p> TS only support string
                          },
                        })}
                      />
                      <label
                        htmlFor="email"
                        className="floating__label"
                        data-content="E-Mail"
                      >
                        <span className="hidden--visually">E-Mail</span>
                      </label>
                      <ErrorWrapper className="inputError">
                        <ErrorMessage as="span" errors={errors} name="Email" />
                      </ErrorWrapper>
                    </InputFieldNew>

                    <Controller
                      control={control}
                      name="Birthday"
                      rules={{ required: "Jeburtstach brooch ick schon.." }}
                      render={({ field: { onChange, onBlur, ref } }) => (
                        <InputFieldNew>
                          <ReactInputDateMask
                            onBlur={onBlur}
                            onChange={onChange}
                            inputRef={ref}
                            showMaskOnFocus={true}
                            mask="dd.mm.yyyy"
                            id="birthday"
                            name="birthday"
                            type="text"
                            className={`floating__input bday__input ${
                              formBday &&
                              formBday !== "dd.mm.yyyy" &&
                              "has-value"
                            }`}
                          />
                          <label
                            htmlFor="birthday"
                            className="floating__label"
                            data-content="Geburtstag"
                          >
                            <span className="hidden--visually">Geburtstag</span>
                          </label>
                          <ErrorWrapper className="inputError">
                            <ErrorMessage
                              as="span"
                              errors={errors}
                              name="Birthday"
                            />
                          </ErrorWrapper>
                        </InputFieldNew>
                      )}
                    />
                  </PersonalFieldsRow>

                  <PersonalFieldsRow className="halfs">
                    <Controller
                      control={control}
                      name="Land"
                      rules={{ required: "woher?" }}
                      render={({ field }) => (
                        <div>
                          <Select
                            classNamePrefix="react-select"
                            // menuIsOpen={true}
                            placeholder="Land"
                            styles={{
                              indicatorSeparator: () => {},
                              ...customStyles,
                            }}
                            options={countryList}
                            onChange={optionSelected => {
                              setCountry(optionSelected)
                              field.onChange(optionSelected.label)
                            }}
                            filterOption={createFilter(filterConfig)}
                            name="country"
                            value={country}
                            className="landSelect"
                          />
                          <ErrorWrapper className="inputError">
                            <ErrorMessage
                              as="span"
                              errors={errors}
                              name="Land"
                            />
                          </ErrorWrapper>
                        </div>
                      )}
                    />

                    <InputFieldNew>
                      <input
                        id="plzort"
                        name="plzort"
                        placeholder="hans@dampf.ch"
                        type="text"
                        className="floating__input"
                        {...register("PlzOrt", { required: "Brauchts auch.." })}
                      />
                      <label
                        htmlFor="plzort"
                        className="floating__label"
                        data-content="PLZ / Ort"
                      >
                        <span className="hidden--visually">PLZ / Ort</span>
                      </label>
                      <ErrorWrapper className="inputError">
                        <ErrorMessage as="span" errors={errors} name="PlzOrt" />
                      </ErrorWrapper>
                    </InputFieldNew>
                  </PersonalFieldsRow>
                </SectionContent>
              </SectionWrapper>

              <SectionWrapper>
                <SubmitButton text="Anfrage Abschicken"/>
              </SectionWrapper>
            </FormWrapper>
          
          <Summary
            startdatum={formDaten && formDaten.Ankunft}
            enddatum={formDaten && formDaten.Abreise}
            dauer={JSON.stringify(startDate && startDate.diff(endDate, "days"))}
            gym={gymData.title}
            unterkunft={formUnterkunft}
            preis={acomPreis && Number(acomPreis) + Number(gymData.ACF_Gyms.price)}
          />
        </>
        ) : (
          <div>jesendet</div>
        )
      ) : (
        <Row>
          <CardsWrapper>
            {data.allWpGym.edges.map(({ node }) => (
              <GymCard
                key={node.title}
                gym={node}
                thirds
                isAnfrage
                clicker={() => {
                  localStorage.setItem("gymData", JSON.stringify(node))
                  setGymChosen(!gymChosen)
                }}
              />
            ))}
          </CardsWrapper>
        </Row>
      )}
    </Layout>
  )
}

export default AnfrageFormularNeu

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "anfrage" }) {
      id
      title
      featuredImage {
        node {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH)
            }
          }
        }
      }
      ACF_Global {
        lightHeader
      }
    }
    allWpDestination {
      edges {
        node {
          ...DestinationFragment
        }
      }
    }
    allWpGym {
      edges {
        node {
          ...GymFragment
        }
      }
    }
    allWpAccommodation {
      edges {
        node {
          ...AccommodationFragment
        }
      }
    }
  }
`
