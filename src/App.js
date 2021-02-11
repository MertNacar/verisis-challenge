import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import Home from "./pages/Home";
import Create from "./pages/Create";
import Edit from "./pages/Edit";

library.add(fas)

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/create">
          <Create />
        </Route>
        <Route path="/edit/:id">
          <Edit />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
