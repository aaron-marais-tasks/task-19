import React from 'react'

import Header from "./Components/Header"
import Results from "./Components/Results"

function App() {
  const [query, setQuery] = React.useState("")

  const setupSearch = value => {
    setQuery(value)
  }

  return (
    <div className="App">
      <Header onSubmit={setupSearch} />
      <Results query={query} />
    </div>
  )
}

export default App;
