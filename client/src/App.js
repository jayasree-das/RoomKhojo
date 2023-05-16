import logo from './logo.svg';
import './App.css';
import Navbar from "./components/Navbar";
import {BrowserRouter, Route , path} from 'react-router-dom'
import Homescreen from "./screens/Homescreen";
import Bookingscreen from "./screens/Bookingscreen";
import Registerscreen from './screens/Registerscreen';
import Loginscreen from './screens/Loginscreen';
import LandingScreen from "./screens/LandingScreen";
import Profilescreen from './screens/Profilescreen';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <BrowserRouter>
         <Route path="/" exact component={LandingScreen} />
         <Route path="/home" exact component={Homescreen}/>
         <Route path="/book/:roomid/:fromdate/:todate" exact component={Bookingscreen} />
         <Route path="/register" exact component={Registerscreen}/>
         <Route path="/login" exact component={Loginscreen}/>
         <Route path="/profile" exact component={Profilescreen}/>
      </BrowserRouter>
    </div>
  );
}

export default App;
