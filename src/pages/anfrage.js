import React, { useState, useEffect, useContext } from "react"
import { Formik, Field, Form } from "formik"
import axios from "axios"
import DatePickerWithFormik from "../components/Form/datepicker"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import Row from "../components/Blocks/row"
import AcomCard from "../components/DetailPages/acomCard"
import GymCard from "../components/gymCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { format } from "date-fns"
import ImageHeader from "../components/ImageHeader"
import { de } from "date-fns/locale"

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

const CustomRadio = styled.label`
  margin: 20px;

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
    background: var(--primary);
  }
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

const AnfrageFormular = ({ data }) => {
  const [gymData, setGymData] = useState()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [gymChosen, setGymChosen] = useState(false)
  const [step, setStep] = useState(1)

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
    <Layout>
      <ImageHeader
        image={data.wpPage.featuredImage.node.localFile}
        imagealt={data.wpPage.featuredImage.node.altText}
        title={`${dataLoaded ? "Anfrage " + gymData.title : "Anfrage stellen"}`}
      />
      {dataLoaded ? (
        <>
          <button onClick={() => setStep(1)}>Step 1</button>
          <button onClick={() => setStep(2)}>Step 2</button>
          <button onClick={() => setStep(3)}>Step 3</button>
          <Formik
            initialValues={{
              // package: "",
              start: "",
              end: "",
              dauer: "",
              firstName: "",
              lastName: "",
              email: "",
              toggle: "",
            }}
            onSubmit={async values => {
              // await new Promise(r => setTimeout(r, 500))
              // alert(JSON.stringify(values.firstName, null, 2))
              setIsSubmitting(true)
              const bodyFormData = new FormData()
              bodyFormData.set("firstName", values.firstName)
              bodyFormData.set("lastName", values.lastName)
              bodyFormData.set("email", values.email)
              bodyFormData.set("toggle", values.toggle)
              // bodyFormData.set("package", values.package)
              bodyFormData.set("start", values.start)
              bodyFormData.set("end", values.end)
              bodyFormData.set("dauer", values.dauer)
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
              <Form>
                {values.start &&
                  format(new Date(values.start), "dd MMMM yyyy ", {
                    locale: de,
                  })}
                -
                {values.end &&
                  format(new Date(values.end), " dd MMMM yyyy", { locale: de })}
                {values.dauer > 30 ? <span>Ohhh Visa</span> : null}
                {step === 1 && (
                  <StepOne>
                    <StepHeader>
                      {/* <div id="my-radio-group">package</div> */}
                    </StepHeader>

                    <Field
                      component={DatePickerWithFormik}
                      // name="DatePickerWithFormik"
                      required
                    />

                    <AcomWrapper role="group" aria-labelledby="my-radio-group">
                      {gymData.ACF_Gyms.accommodations.map(acom => {
                        return (
                          <CustomRadio>
                            <Field
                              type="radio"
                              name="hotel"
                              value={acom.title}
                            />
                            <AcomCard
                              minimal
                              key={acom.title}
                              title={acom.title}
                              preis={acom.ACF_Accommodations.preis}
                              image={acom.featuredImage.node.localFile}
                              sterne={acom.ACF_Accommodations.sterne}
                            />
                          </CustomRadio>
                        )
                      })}
                    </AcomWrapper>
                  </StepOne>
                )}
                {step === 2 && (
                  <StepTwo>
                    <AcomWrapper>
                      {gymData.ACF_Gyms.accommodations.map(acom => {
                        return (
                          <AcomCard
                            key={acom.title}
                            title={acom.title}
                            preis={acom.ACF_Accommodations.preis}
                            image={acom.featuredImage.node.localFile}
                            description={acom.ACF_Accommodations.description}
                            amenities={acom.ACF_Accommodations.amenities}
                            sterne={acom.ACF_Accommodations.sterne}
                          />
                        )
                      })}
                    </AcomWrapper>
                    <label htmlFor="firstName">First Name</label>
                    <Field id="firstName" name="firstName" placeholder="Jane" />

                    <label htmlFor="lastName">Last Name</label>
                    <Field id="lastName" name="lastName" placeholder="Doe" />

                    <label htmlFor="email">Email</label>
                    <Field
                      id="email"
                      name="email"
                      placeholder="jane@acme.com"
                      type="email"
                    />
                  </StepTwo>
                )}
                {step === 3 && (
                  <StepThree>
                    <button type="submit">Submit</button>
                  </StepThree>
                )}
              </Form>
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
