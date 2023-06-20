import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Room from "./components/Room";
import GameBoard from "./components/GameBoard";
import SplashPage from "./components/SplashPage";
import "./App.scss";
function App() {
  return (
    <div className="app">
      <Navigation />
      <Switch>
        {/* <Route path='/rooms/:roomId'>
        </Route> */}
        <Route path='/games/:gameId'>
          <GameBoard />
          <Room />
        </Route>
        <Route path='/'>
          <SplashPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
