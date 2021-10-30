import React, { useState, useEffect, useContext } from "react"
import { Formik, Field, Form } from "formik"
import DatePickerWithFormik from "../components/Form/datepicker"
import styled from "styled-components"
import { Link, graphql } from "gatsby"
import AcomCard from "../components/DetailPages/acomCard"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { format } from "date-fns"
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

const AnfrageFormular = () => {
  const [gymData, setGymData] = useState()
  const [dataLoaded, setDataLoaded] = useState(false)
  const [step, setStep] = useState(1)

  console.log(gymData)

  useEffect(() => {
    if (localStorage.getItem("gymData")) {
      setGymData(JSON.parse(localStorage.getItem("gymData")))
      setDataLoaded(true)
    }
  }, [])

  return (
    <Layout>
      {dataLoaded ? (
        <>
          <h1>Anfrage für {gymData.title}</h1>
          <button onClick={() => setStep(1)}>Step 1</button>
          <button onClick={() => setStep(2)}>Step 2</button>
          <button onClick={() => setStep(3)}>Step 3</button>
          <Formik
            initialValues={{
              package: "",
              start: "",
              end: "",
              dauer: "",
              firstName: "",
              lastName: "",
              email: "",
              toggle: "",
            }}
            onSubmit={async values => {
              await new Promise(r => setTimeout(r, 500))
              alert(JSON.stringify(values, null, 2))
            }}
          >
            {({ setFieldValue, setFieldTouched, values, errors, touched }) => (
              <Form>
                {values.start &&
                  format(new Date(values.start), "dd MMMM yyyy", {
                    locale: de,
                  })}
                {values.end &&
                  format(new Date(values.end), "dd MMMM yyyy", { locale: de })}
                {values.dauer > 30 ? <span>Ohhh Visa</span> : null}

                {step === 1 && (
                  <StepOne>
                    <StepHeader>
                      <div id="my-radio-group">package</div>
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
        <span>Loading</span>
      )}
    </Layout>
  )
}

export default AnfrageFormular

export const pageQuery = graphql`
  query {
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
