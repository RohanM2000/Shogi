import { Switch, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Room from "./components/Room";
import GameBoard from "./components/GameBoard";
import SplashPage from "./components/SplashPage";
import PlayQueue from "./components/PlayQueue";
import UserIndex from "./components/UserIndex";
import ProfilePage from "./components/ProfilePage";
import UserShow from "./components/UserShow";
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
        <Route path='/play'>
          <PlayQueue />
        </Route>
        <Route path='/members/:memberId'>
          <UserShow />
        </Route>
        <Route path='/leaderboard'>
          <UserIndex />
        </Route>
        <Route path='/search/:searchQuery'>
          <UserIndex />
        </Route>
        <Route path='/profile'>
          <ProfilePage />
        </Route>
        <Route path='/'>
          <SplashPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
