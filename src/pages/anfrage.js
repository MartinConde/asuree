import React, { useState, useEffect } from "react"
import { Formik, Field, Form } from "formik"
import axios from "axios"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Row from "../components/Blocks/row"
import AcomCard from "../components/DetailPages/acomCard"
import GymCard from "../components/gymCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ImageHeader from "../components/ImageHeader"
import { de } from "date-fns/locale"
import StepBtn from "../components/Anfrage/stepBtn"
import InputField from "../components/Anfrage/inputField"
import DateField from "../components/Anfrage/dateField"
import { addDays, format } from "date-fns"
import ImgRadio from "../components/Anfrage/imgRadio"
import SingleDateField from "../components/Anfrage/singleDateField"
import Summary from "../components/Anfrage/summary"
import SelectField from "../components/Anfrage/selectField"
import TestField from "../components/Anfrage/Select/TestField"

const StepOne = styled.div`
  height: 100vh;
  width: 100%;
`

const StepTwo = styled.div``

const StepThree = styled.div``

const StepHeader = styled.div``

const StepFields = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const AcomWrapper = styled.div`
  @media (min-width: 768px) {
    display: flex;
    justify-content: center;
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
  align-items: center;
  margin-bottom: 50px;

  &.triple > div {
    width: 50%;
  }
`

function validateEmail(value) {
  let error
  if (!value) {
    error = "Brooch ick"
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = "Watn dit für ne mail"
  }
  return error
}

function validateName(value) {
  let error
  if (!value) {
    error = "Brooch ick"
  }
  return error
}

function validateCountry(value) {
  let error
  if (!value) {
    error = "Brooch ick"
  }
  return error
}

const options = [
  { value: "foo", label: "Foo" },
  { value: "bar", label: "Bar" },
]

const AnfrageFormular = ({ data }) => {
  const [gymData, setGymData] = useState()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [gymChosen, setGymChosen] = useState(false)
  const [step, setStep] = useState(1)

  const [country, setCountry] = useState()
  const [region, setRegion] = useState()

  const [token, setToken] = useState("") // store token
  const [isSuccessMessage, setIsSuccessMessage] = useState(false) // manage is success message state
  const [messageSent, setMessageSent] = useState(false) // manage sent message state
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        username: "admin@homepagelabor.ch", // provide a user credential with subscriber role
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

  return (
    <Layout light={data.wpPage.ACF_Global.lightHeader}>
      <ImageHeader
        image={data.wpPage.featuredImage.node.localFile}
        imagealt={data.wpPage.featuredImage.node.altText}
        title={`${dataLoaded ? "Anfrage " + gymData.title : "Anfrage stellen"}`}
        light={data.wpPage.ACF_Global.lightHeader}
      />
      {dataLoaded ? (
        <>
          <Formik
            validateOnChange
            initialValues={{
              dates: "",
              start: "",
              end: "",
              dauer: "",
              hotel: "",
              name: "",
              country: "",
              email: "",
              toggle: "",
              geburtstag: "",
              tag: "",
              monat: "",
              jahr: "",
              test: ""
            }}
            onSubmit={async values => {
              setIsSubmitting(true)
              const bodyFormData = new FormData()
              bodyFormData.set("name", values.name)
              bodyFormData.set("email", values.email)
              bodyFormData.set("toggle", values.toggle)
              bodyFormData.set("dates", values.dates)
              bodyFormData.set("hotel", values.hotel)
              bodyFormData.set("end", values.end)
              bodyFormData.set("dauer", values.dauer)
              bodyFormData.set("country", values.country)
              bodyFormData.set("tag", values.tag)
              bodyFormData.set("monat", values.monat)
              bodyFormData.set("jahr", values.jahr)
              bodyFormData.set("plzort", values.plzort)
              bodyFormData.set("test", values.test)
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
            }}
          >
            {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
              console.log(values),
              (
                <Form>
                  <StepFields>
                    <StepBtn
                      clicker={() => setStep(1)}
                      text="Reisedauer"
                      complete={
                        JSON.stringify(values.dates.startDate) !=
                        JSON.stringify(values.dates.endDate)
                      }
                    />
                    <StepBtn
                      clicker={() => setStep(2)}
                      text="Unterkunft"
                      complete={values.hotel}
                    />
                    <StepBtn
                      clicker={() => setStep(3)}
                      text="Persönliche Daten"
                    />
                  </StepFields>
                  <Summary
                    startdatum={values.dates.startDate}
                    enddatum={
                      JSON.stringify(values.dates.startDate) !=
                        JSON.stringify(values.dates.endDate) &&
                      values.dates.endDate
                    }
                    dauer={values.dauer}
                    visum={values.toggle}
                    unterkunft={values.hotel}
                    name={values.name}
                    email={values.email}
                    land={values.country}
                    stadt={values.plzort}
                    bdayTag={values.tag}
                    bdayMonat={values.monat}
                    bdayJahr={values.jahr}
                  />

                  {step === 1 && (
                    <StepOne>
                      <StepHeader></StepHeader>

                      <DateField name="dates" label="datum" />
                    </StepOne>
                  )}
                  {step === 2 && (
                    <StepTwo>
                      <AcomWrapper
                        role="group"
                        aria-labelledby="my-radio-group"
                      >
                        {gymData.ACF_Gyms.accommodations.map(acom => {
                          return (
                            <ImgRadio name="hotel" value={acom.title}>
                              <AcomCard
                                minimal
                                key={acom.title}
                                title={acom.title}
                                preis={acom.ACF_Accommodations.preis}
                                image={acom.featuredImage.node.localFile}
                                sterne={acom.ACF_Accommodations.sterne}
                              />
                            </ImgRadio>
                          )
                        })}
                      </AcomWrapper>
                    </StepTwo>
                  )}
                  {step === 3 && (
                    <StepThree>
                      <PersonalFields>
                        {/* <TestField
                        name="test"
                          validator={validateName}
                          valid={touched.name && !errors.name}
                          error={touched.name && errors.name}
                        /> */}
                        <PersonalFieldsRow className="triple">
                          <InputField
                            name="name"
                            label="Name"
                            type="text"
                            placeholder="Hans Dampf"
                            validator={validateName}
                            valid={touched.name && !errors.name}
                            error={touched.name && errors.name}
                          />

                          <InputField
                            name="email"
                            label="E-Mail"
                            type="email"
                            placeholder="hans@dampf.ch"
                            validator={validateEmail}
                            valid={touched.email && !errors.email}
                            error={touched.email && errors.email}
                          />
                        </PersonalFieldsRow>

                        <PersonalFieldsRow>
                          <SingleDateField />
                        </PersonalFieldsRow>
                        <PersonalFieldsRow className="triple">
                          <SelectField
                            name="country"
                            validator={validateCountry}
                            valid={touched.country && !errors.country}
                            error={touched.country && errors.country}
                          />

                          <InputField
                            name="plzort"
                            label="PLZ / Ort"
                            type="text"
                            placeholder="Zug"
                            validator={validateName}
                            valid={touched.name && !errors.name}
                            error={touched.name && errors.name}
                          />
                        </PersonalFieldsRow>
                      </PersonalFields>

                      <button type="submit">Submit</button>
                    </StepThree>
                  )}
                </Form>
              )
            )}
          </Formik>
        </>
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

export default AnfrageFormular

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
