import React, { useState } from "react"

export const myContext = React.createContext()

const Provider = props => {
  const [isGymResult, setGymResults] = useState(false)
  const [destination, setDestination] = useState('Alle')
  const [level, setLevel] = useState('Alle')
  const [dauer, setDauer] = useState('Alle')

  return (
    <myContext.Provider
      value={{
        isGymResult,
        setGymResults,
        destination,
        setDestination,
        level,
        setLevel,
        dauer,
        setDauer
      }}
    >
      {props.children}
    </myContext.Provider>
  )
}

export default ({ element }) => <Provider>{element}</Provider>
