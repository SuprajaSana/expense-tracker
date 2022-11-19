import { Route} from "react-router-dom";

import LogIn from "./pages/LoginPage";
import Profile from "./pages/ProfilePage";
import SignUp from "./pages/SignupPage";
import Welcome from "./pages/WelcomPage";

function App() {
  return (
    <main>
      <Route path="/" exact>
        <SignUp></SignUp>
      </Route>
      <Route path='/login'>
        <LogIn></LogIn>
      </Route>
      <Route path='/welcome'>
        <Welcome></Welcome>
      </Route>
      <Route path='/completeprofile'>
        <Profile></Profile>
      </Route>
    </main>
  );
}

export default App;
