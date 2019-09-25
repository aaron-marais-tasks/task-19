/*
  This file holds my main application
*/

// Import React into script scope, as well as react router switch, route, and with router,
// our promise tracker and loader
import React from 'react'
import { Route, Switch, withRouter } from "react-router-dom"
import { usePromiseTracker } from "react-promise-tracker"
import ScaleLoader from 'react-spinners/ScaleLoader'

// Import base styling
import "./App.css"

// Import "static" components (unchanged by routing, save fourohfour)
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import FourOhFour from "./Components/FourOhFour"

// Import body components
import Index from "./Components/Index"
import Results from "./Components/Results"
import Album from "./Components/Album"
import Book from "./Components/Book"

const App = props => {
  /*
    State variables
  */

  // Our seach value input from header or index
  const [searchValue, updateSearchValue] = React.useState("")

  // Boolean if promise is in progress
  const { promiseInProgress } = usePromiseTracker()

  /*
    Callbacks
  */

  // Set up our searcher
  const setupSearch = value => {
    // Update our search value state item
    updateSearchValue(value)

    // Push the new search into history (redirect)
    props.history.push(`/search/${encodeURIComponent(value)}`)
  }

  /*
    Rendering
  */
  return (
    <div className="App">
      {/* Render header component, and pass props, onsubmit and
        current search value */}
      <Header {...props} onSubmit={setupSearch} value={searchValue} />

      {/* Core content (body). Has loading class to hide content if loading */}
      <section className={"body" + (promiseInProgress ? " loading" : "")}>
        {/* Loading bars; hidden if content is available */}
        <div className="loader">
          <ScaleLoader
            height={80}
            width={40}
            color={'#1FF28F'}
          />
        </div>

        {/* Router switch; betweeen favorites, search, album, book, and index */}
        <Switch location={props.location}>
          {/* Favorites route is similar to search results from API; render the
              Results component */}
          <Route path="/favorites" render={props => <Results {...props} favorites />} />

          <Route path="/search/:query" component={Results} />
          <Route path="/album/:id" component={Album} />
          <Route path="/book/:id" component={Book} />
          <Route exact path="/" render={() => <Index onSubmit={setupSearch} />} />
          <Route component={FourOhFour} />
        </Switch>
      </section>

      {/* Render footer */}
      <Footer />
    </div>
  )
}

// Export App with react router
export default withRouter(App);
