import React from "react"
import styled from "styled-components"
import { addDays, format } from "date-fns"
import { de } from "date-fns/locale"

const Wrapper = styled.div``

export default function Summary({
  startdatum,
  enddatum,
  dauer,
  visum,
  unterkunft,
  name,
  email,
  land,
  stadt,
  bdayTag,
  bdayMonat,
  bdayJahr
}) {
  const Difference_In_Time =
    startdatum &&
    addDays(new Date(enddatum), 1).getTime() - startdatum.getTime()

  const Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24)

  // console.log(Difference_In_Days)

  return (
    <Wrapper>
      <div>
        Startdatum:
        {startdatum &&
          format(new Date(startdatum), "dd MMMM yyyy ", {
            locale: de,
          })}
      </div>
      <div>
        Enddatum:
        {enddatum &&
          format(new Date(enddatum), "dd MMMM yyyy ", {
            locale: de,
          })}
      </div>

      <div>Dauer: {Difference_In_Days > 0 && Difference_In_Days}</div>

      {visum && <div>Visumshilfe: {visum}</div>}
      <div>Unterkunft: {unterkunft}</div>
      <div>Name: {name}</div>
      <div>E-Mail: {email}</div>
      <div>Land: {land}</div>
      <div>Stadt: {stadt}</div>
      <div>
        Bday: {bdayTag}.{bdayMonat}.{bdayJahr}</div>
    </Wrapper>
  )
}
