import React from 'react'

import "./App.css"

import Header from "./Components/Header"
import Footer from "./Components/Footer"
import FourOhFour from "./Components/FourOhFour"

import Index from "./Components/Index"
import Results from "./Components/Results"
import Album from "./Components/Album"
import Book from "./Components/Book"

import { Route, Switch, withRouter } from "react-router-dom"

function App(props) {
  const [searchValue, updateSearchValue] = React.useState("")

  const setupSearch = value => {
    updateSearchValue(value)
    props.history.push(`/search/${encodeURIComponent(value)}`)
  }

  return (
    <div className="App">
      <Route path={["/search/:query", "/"]}
        render={props =>
          <Header {...props} onSubmit={setupSearch} value={searchValue} />
        }
      />

      <section className="body">
        <Switch>
          <Route path="/favorites" render={props => <Results {...props} favorites />} />
          <Route path="/search/:query" component={Results} />
          <Route path="/album/:id" component={Album} />
          <Route path="/book/:id" component={Book} />
          <Route path="/" render={() => <Index onSubmit={setupSearch} />} />
          <Route component={FourOhFour} />
        </Switch>
      </section>

      <Footer />
    </div>
  )
}

export default withRouter(App);
