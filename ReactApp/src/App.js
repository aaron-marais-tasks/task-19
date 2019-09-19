import React from 'react'

import Header from "./Components/Header"
import Results from "./Components/Results"
import Album from "./Components/Album"
import Book from "./Components/Book"

import { Route, Switch, withRouter } from "react-router-dom"

function App(props) {
  const setupSearch = value => {
    props.history.push(`/search/${encodeURIComponent(value)}`)
  }

  return (
    <div className="App">
      <Header onSubmit={setupSearch} />

      <Switch>
        <Route path="/search/:query" component={Results} />
        <Route path="/album/:id" component={Album} />
        <Route path="/book/:id" component={Book} />
      </Switch>
    </div>
  )
}

export default withRouter(App);
