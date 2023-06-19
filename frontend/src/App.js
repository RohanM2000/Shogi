import { Switch, Route } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Room from "./components/Room";
import GameBoard from "./components/GameBoard";
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
        <Route path='/games/:gameId'>
          <GameBoard />
        </Route>
      </Switch>
    </>
  );
}

export default App;
