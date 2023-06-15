import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Room from "./components/Room";
function App() {
  return (
    <>
      <Navigation />
      <Switch>
        <Route path="/login">
        </Route>
        <Route path='/signup'>
          <SignupFormPage />
        </Route>
        <Route path='/rooms/:roomId'>
          <Room />
        </Route>
      </Switch>
    </>
  );
}

export default App;
