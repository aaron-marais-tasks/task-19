import React from 'react'

import Header from "./Components/Header"
import Results from "./Components/Results"
import Album from "./Components/Album"

import { Route, Switch, withRouter } from "react-router-dom"

function App(props) {
  const [query, setQuery] = React.useState("")

  const setupSearch = value => {
    setQuery(value)
    props.history.push("/search")
  }

  return (
    <div className="App">
      <Header onSubmit={setupSearch} />

      <Switch>
        <Route path="/search" render={props => <Results {...props} query={query} />} />
        <Route path="/album/:id" render={props => <Album {...props} />} />
      </Switch>
    </div>
  )
}

export default withRouter(App);
