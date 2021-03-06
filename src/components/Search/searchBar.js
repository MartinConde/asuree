import React, { useEffect, useContext, useState } from "react"
import styled from "styled-components"
import Select, { components } from "react-select"
import { Link, useStaticQuery, graphql } from "gatsby"
import { myContext } from "../../context/provider"

const SearchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  box-shadow: 0 0 12px rgba(0,0,0,.15);
  z-index: 10;
  position: relative;

  .searchSelect {
    display: block;
    width: calc(50% - 1px);
  }

  &.directSearch select {
    width: 100%;
  }

  @media(max-width: 1199px) {
  .react-select__menu {
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-top: 125px;
  }
}

  @media(min-width:1024px) {
    .searchSelect {
      display: block;
      width: ${props => props.noBtn ? "calc(50% - 1px)" : "33.3%"};
    }
  
    &.directSearch select {
      width: 50%;
    }
  }


`

const SearchButton = styled(Link)`
  /* background: var(--secondary); */
  background-image: linear-gradient(to right, var(--secondary) 30%, var(--primary)  71%, var(--secondary)  100%);
  background-size: 200% auto;
  box-shadow: 0 2px 10px var(--secondary);
  color: #fff;
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
  text-align: center;
  width: 100%;
  transition: .3s all ease-out;

  @media(min-width:1024px) {
    width: 33.3%;
  }

  svg {
    height: 30px;
    margin-bottom: -10px;
    margin-left: 20px;
    transition: .3s all ease-out;
  }

  &:hover {
    /* background: var(--primary); */
    background-position: 258%;
    color: #fff;
  }

  &:hover svg {
    transform: translateX(15px);
  }

  &.disabled {
    opacity: 0.8;
    pointer-events: none;
  }

  &.disabled svg {
    display: none;
  }
`

const OptionWrapper = styled.div`
  display: flex;
  align-items: center;

  svg {
    height: 35px;
  }
`

const Separator = styled.div`
width: 1px;
background: var(--secondary);
height: 70px;
`

const customStyles = {
  control: base => ({
    ...base,
    height: 70,
    minHeight: 70,
    boxShadow: "none",
    borderColor: 'rgba(0,0,0,0)',
    borderRadius: '0',
    '&:hover': { borderColor: 'rgba(0,0,0,0)' },
    
  }),
  option: styles => ({ 
    ...styles, 
    height: 70,
    display: 'flex',
    alignItems: 'center',
    
  }),
}

const { Option, SingleValue } = components
const IconOption = props => (
  <Option {...props}>
    <OptionWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" />
        <path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" />
        <path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" />
        <path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" />
      </svg>
      {props.data.label}
    </OptionWrapper>
  </Option>
)

const IconSingleValue = props => (
  <SingleValue {...props}>
    <OptionWrapper>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M26.151 24.172c6.042-12.77 21.296-18.221 34.066-12.179 12.774 6.045 18.225 21.296 12.18 34.069L49.274 94.925 26.151 46.062a25.592 25.592 0 010-21.89zm2.468 20.727l20.655 43.639L69.93 44.899c5.399-11.416.53-25.038-10.881-30.435-11.408-5.396-25.026-.531-30.43 10.876a22.902 22.902 0 000 19.559z" />
        <path d="M52.033 23.754a2.56 2.56 0 00-2.562-2.557 2.555 2.555 0 000 5.11 2.558 2.558 0 002.562-2.553z" />
        <path d="M57.116 26.885l-1.944 4.628a3.404 3.404 0 01-5.612 1.009L48.034 30.9a.63.63 0 00-.895-.033c-.026.025-.047.055-.068.076l-1.569 2.076a3.4 3.4 0 00-.688 1.902l-.274 6.307a3.349 3.349 0 01-.498 1.637l-3.552 5.779h-4.231l4.219-6.871a3.357 3.357 0 00.498-1.633l.279-6.498c.033-.691.27-1.357.687-1.91l2.856-3.76c.114-.151.237-.295.38-.417a3.392 3.392 0 014.805.147l1.32 1.409a.63.63 0 001.042-.194l.544-1.282a2.564 2.564 0 01-.484-2.733 2.557 2.557 0 014.711 1.983zM56.45 30.795h2.479a2.556 2.556 0 003.385 1.271 2.556 2.556 0 00-1.055-4.882h-3.295l-1.514 3.611z" />
        <path d="M50.308 42.891l.856 5.754h3.648l-1.143-7.668a3.402 3.402 0 00-1.211-2.136L48.7 35.777a1.802 1.802 0 10-2.278 2.794l2.674 2.185a3.437 3.437 0 011.212 2.135z" />
      </svg>
      {props.data.label}
    </OptionWrapper>
  </SingleValue>
)


export default function SearchBar({ withButton, noBtn }) {
  const searchdata = useStaticQuery(graphql`
    query SearchQuery {
      allWpDestination(sort: {order: ASC, fields: title}) {
        edges {
          node {
            ...DestinationFragment
          }
        }
      }
      allWpGym(sort: {order: ASC, fields: title}) {
        edges {
          node {
            ...GymFragment
          }
        }
      }
    }
  `)

  const [selectOpen, setSelectOpen] = useState(false)

  const context = useContext(myContext)
  const gyms = searchdata.allWpGym.edges

  const gymlevels = searchdata.allWpGym.edges.map(({ node }) =>
    node.ACF_Gyms.level.map(level => level)
  )
  var mergedGymlevels = [].concat.apply([], gymlevels)
  const finalGymlevels = [...new Set(mergedGymlevels)]

  // Get all destinations and filter out the ones that have gyms
  const destins = searchdata.allWpDestination.edges.map(({ node }) => node)

  const bigCities = destins.filter(function (e) {
    return e.ACF_Destinations.gyms
  })

  const destinationOptions = bigCities.map(function (e) {
    return { value: e.title, label: e.title }
  })

  const levelOptions = finalGymlevels.map(function (level) {
    return { value: level, label: level }
  })

  useEffect(() => {
    const results = gyms
      .map(({ node }) => ({
        ...node,
        destinations: node.ACF_Gyms.destinations.filter(
          destination => destination.title === context.destination
        ),
        levels: node.ACF_Gyms.level.filter(level => level === context.level),
      }))
      .filter(
        node =>
          (context.destination !== "Alle"
            ? node.destinations.length > 0
            : node.destinations.length === 0) &&
          (context.level !== "Alle"
            ? node.levels.length > 0
            : node.levels.length === 0)
      )

    context.setGymResults(results)
  }, [context.destination, context.level])

  

  return (
    <myContext.Consumer>
      {context => (
        <SearchWrapper
          withButton={withButton}
          noBtn={noBtn}
          className={withButton ? "fullSearch" : "directSearch"}
        >
          <Select
           className="searchSelect"
           classNamePrefix="react-select"
            options={destinationOptions}
            isClearable
            placeholder="Alle Provinzen"
            styles={{indicatorSeparator: () => {}, ...customStyles}}
            onChange={optionSelected =>
              context.setDestination(
                optionSelected ? optionSelected.value : "Alle"
              )
            }
          />

          <Separator/>

          <Select
          className="searchSelect"
          classNamePrefix="react-select"
            options={levelOptions}
            isClearable
            components={{ Option: IconOption, SingleValue: IconSingleValue }}
            isSearchable={false}
            placeholder="Alle Levels"
            styles={{indicatorSeparator: () => {}, ...customStyles}}
            onChange={optionSelected =>
              context.setLevel(optionSelected ? optionSelected.value : "Alle")
            }
          />

          {/* <select
            value={context.destination && context.destination}
            onChange={e => context.setDestination(e.currentTarget.value)}
          >
            <option defaultValue value="Alle">
              Alle Destinations
            </option>
            {bigCities.map(dest => (
              <option key={dest.title} value={dest.title}>
                {dest.title}
              </option>
            ))}
          </select> */}

          {/* <select
            value={context.level && context.level}
            onChange={e => context.setLevel(e.currentTarget.value)}
          >
            <option defaultValue value="Alle">
              Alle Level
            </option>
            {finalGymlevels.map(level => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select> */}

          {withButton && (
            <SearchButton
              to="/camps#camps"
              className={context.isGymResult.length === 0 && "disabled"}
            >
              <span>
              {context.isGymResult.length === 0 && "Hmm.. Leider nischt jefunden"}
              {context.isGymResult.length === 1 && "Ein gefundenes gym anzeigen"}
              {context.isGymResult.length > 1 && `${context.isGymResult.length} gefundene gyms anzeigen`}
              <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 42 29"><g clipPath="url(#clip0)" fill="#fff"><path d="M33.21 26.406a3.52 3.52 0 002.52.794c1.05-.1 2.582-.709 3.883-3.274 1.058-2.048 1.802-5.032 2.227-8.873.102-.942.155-1.888.16-2.835 0-3.841-.995-6.69-3.041-8.71A11.79 11.79 0 0032.695.496a34.864 34.864 0 00-8.184-.44c-4.252.17-7.287 1.305-10.216 2.354C11.51 3.437 8.866 4.4 5.338 4.4c-1.524 0-3.201.184-4.127 1.53-.696.993-.696 2.247-.745 3.835v.468a84.41 84.41 0 00-.048 2.849 32.768 32.768 0 00.354 5.152c.054.825.362 1.612.88 2.248a3.848 3.848 0 002.009 1.295c1.287.369 2.916.305 5.164.22.487 0 .988-.035 1.524-.05.713-.049 1.43-.049 2.143 0 .195 0 .292.085.807.39.815.492 1.654.941 2.513 1.347.974.468 2.039 1.105 3.16 1.786 3.479 2.126 7.39 4.457 11.218 3.153a5.804 5.804 0 003.02-2.218zm7.238-11.51c-.41 3.8-1.12 6.38-1.949 8.116.13-.308.249-.62.355-.936.09-.27.167-.546.244-.822l.195-.83c.111-.56.215-1.119.285-1.672l.09-.383.042-.41.077-.801.056-.773.041-.709c0-.482.042-.935.042-1.353V11.53l-.063.766-.07.872-.124 1.084c-.042.418-.112.864-.167 1.332l-.112.709-.125.751-.153.773-.077.39-.097.396a20.983 20.983 0 01-.425 1.574l-.257.772-.3.709c-.195.46-.428.904-.695 1.325a5.767 5.767 0 01-.411.56c-.142.18-.3.346-.473.496-.257.24-.557.425-.884.546-.133.047-.27.078-.41.092a4.667 4.667 0 000-.652 3.534 3.534 0 00-.112-.822 3.729 3.729 0 00-.32-.85 3.977 3.977 0 00-.55-.773c-.104-.113-.223-.22-.334-.326a4.152 4.152 0 00-.362-.284 4.495 4.495 0 00-.383-.255l-.188-.113-.201-.1a6.584 6.584 0 00-.39-.184c-.132-.056-.258-.113-.383-.155-.125-.043-.257-.086-.383-.135l-.361-.106c-.237-.071-.467-.114-.696-.17-.23-.057-.397-.078-.571-.107-.174-.028-.32-.057-.439-.07l-.39-.057.377.113c.118.043.257.078.424.142.167.064.341.12.536.198.195.078.41.156.626.27.112.049.223.099.334.155l.341.185c.112.056.223.134.334.198.112.064.223.149.334.227.112.078.112.078.16.12l.16.128c.103.084.2.174.293.27.097.089.188.186.271.29.083.096.16.198.23.305a2.776 2.776 0 01.46 1.283 2.6 2.6 0 010 .573l-.05.255a3.432 3.432 0 00-.786-2.112 4.37 4.37 0 00-.932-.864 7.263 7.263 0 00-1.114-.645 9.994 9.994 0 00-1.204-.46 10.23 10.23 0 00-.62-.185h-.076a.425.425 0 00-.076 0h-.154c-.104 0-.215-.05-.32-.07a9.368 9.368 0 00-1.225-.135h-1.14c-.363 0-.697.042-1.017.078-.32.035-.598.077-.849.12-.25.043-.466.092-.647.127-.181.036-.32.079-.41.1l-.147.035h.146c.098 0 .237-.042.418-.056.18-.015.403-.05.654-.064.25-.015.536-.036.849-.043.313-.007.647 0 1.002 0s.696.057 1.107.114c.387.05.77.129 1.148.233.386.119.762.266 1.127.44.369.164.727.35 1.072.56.329.204.637.442.919.708.252.22.472.476.654.759.156.234.267.496.327.772a2.343 2.343 0 01-.097 1.276c-.18.392-.414.754-.696 1.077-.205.206-.44.378-.696.51.128-.14.247-.29.355-.446a3.48 3.48 0 00.369-.66 2.8 2.8 0 00.201-.637c.037-.182.056-.367.056-.553.012-.139.012-.279 0-.418a1.978 1.978 0 00-.049-.262v-.092.333a2.6 2.6 0 01-.07.39 2.476 2.476 0 01-.18.467 2.518 2.518 0 01-.306.496c-.128.169-.276.32-.439.454a3.474 3.474 0 01-.55.376 3.306 3.306 0 01-.619.29c-.21.083-.427.15-.647.199a4.425 4.425 0 01-.647.113c-.21 0-.411.035-.606.035a1.82 1.82 0 01-.278 0h-.258a2.171 2.171 0 01-.236 0 1.992 1.992 0 01-.216 0 .542.542 0 01-.23-.042c-6.166-1.8-8.713-3.281-10.014-4.231a9.933 9.933 0 01-3.807-5.819v-.184c-.063-.432-.133-.879-.188-1.332l-.181-1.382a114.99 114.99 0 01-.494-5.096 72.934 72.934 0 01-.14-2.331s-.062.935-.062 2.331v5.153l.049 1.417c0 .46.041.914.062 1.354.021.439.05.864.07 1.268l.076 1.141.084.95.07.709h-1.928c-.752 0-1.448.05-2.088.07h.111l.696-.19c.237-.062.469-.126.696-.192.216-.064.418-.135.599-.192.18-.056.348-.113.5-.17l.377-.141c.208-.078.334-.12.334-.12l-.348.056c-.112 0-.244.021-.397.064-.153 0-.327.042-.522.07-.195.029-.39.057-.605.071l-.696.064-.731.043H6.04c-.209 0-.453 0-.696-.057-.244-.057-.41-.043-.592-.071-.18-.028-.515-.078-.696-.113-.062-.255-.139-.546-.208-.865-.07-.319-.147-.66-.223-1.028-.077-.368-.146-.793-.216-1.197s-.14-.822-.188-1.248l-.076-.644-.063-.652a20.543 20.543 0 01-.097-1.305c-.021-.432 0-.857-.05-1.268-.048-.411 0-.808 0-1.184v-1.07l.057-.9.076-.709.063-.609-.126.595-.139.709-.083.893-.084.517-.062.546c-.042.383-.098.78-.119 1.198-.02.418-.076.85-.083 1.29-.007.439-.056.885-.056 1.36v1.304c0 .44 0 .872.056 1.29l.104 1.212c.042.383.077.744.125 1.077 0 .22.056.425.084.624a3.201 3.201 0 01-.62-1.602 32.56 32.56 0 01-.34-4.96c0-.993 0-2.042.055-3.26.063-2.836.077-3.984 3.48-3.984 7.488 0 11.058-4.018 19.257-4.351 9.444-.39 16.006 1.283 16.006 10.723a24.85 24.85 0 01-.139 2.707z"/><path d="M11.093 7.867l-.104.517c0 .198-.07.425-.098.673-.027.248-.062.525-.083.808-.02.284-.056.588-.07.9v2.927l.05.964.076.9.09.8c0 .249.056.476.09.674l.084.525.084.453v-.46l.034-1.212v-3.643l-.041-3.643V7.385v.12l-.112.362zm25.938-3.615a8.656 8.656 0 00-.981-.645 10.813 10.813 0 00-1.392-.63 14.213 14.213 0 00-1.72-.518 19.99 19.99 0 00-1.969-.347 28.157 28.157 0 00-2.13-.177 45.531 45.531 0 00-2.198-.05c-.738 0-1.476 0-2.2.05-.712.022-1.423.081-2.13.177a19.81 19.81 0 00-1.976.34c-.626.135-1.204.298-1.733.46-.528.164-1.009.327-1.433.476-.425.149-.787.297-1.086.425-.3.128-.536.22-.696.29l-.236.093.257-.064.696-.184c.626-.156 1.51-.397 2.582-.638.529-.12 1.113-.248 1.726-.355.306-.063.626-.106.946-.155.167 0 .328-.05.494-.078l.502-.064c.695-.071 1.392-.142 2.087-.177.696-.036 1.448-.057 2.179-.078.73-.022 1.454 0 2.171 0 .717 0 1.392.05 2.088.113.696.064 1.336.149 1.948.262.578.108 1.15.248 1.712.418.476.15.941.332 1.392.546a9.068 9.068 0 011.615 1l.209.17-.195-.185a7.229 7.229 0 00-.529-.475zm-27.65 14.72c-.25 0-.543 0-.856.05H4.878s.077 0 .223.07c.146.071.153.05.258.079.104.028.215.05.34.07.136.03.273.051.411.064.149 0 .302.014.46.043h.995c.167 0 .34 0 .508-.043.167-.042.334 0 .487-.064.289-.044.574-.106.856-.184.244-.064.445-.135.592-.184l.215-.092h-.236c-.153 0-.355.177-.606.191z"/></g><defs><clipPath id="clip0"><path fill="#fff" transform="rotate(-90 14.5 14.5)" d="M0 0h29v42H0z"/></clipPath></defs></svg>
              </span>
            </SearchButton>
          )}
        </SearchWrapper>
      )}
    </myContext.Consumer>
  )
}
