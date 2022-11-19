import { Route} from "react-router-dom";

import LogIn from "./pages/LoginPage";
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
    </main>
  );
}

export default App;
