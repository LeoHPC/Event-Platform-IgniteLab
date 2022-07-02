import { ApolloProvider } from "@apollo/client"
import { BrowserRouter } from "react-router-dom"

import { client } from "./lib/apollo"
import { Router } from "./Router"

function App() {
  return (
    <div>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </BrowserRouter>
    </div>
  )
}

export default App