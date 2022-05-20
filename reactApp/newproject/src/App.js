import logo from './logo.svg';
import PersonList from './comonents/person';
import { render } from "react-dom";
import { Navigate, Route, Routes, BrowserRouter } from "react-router-dom";
import './App.css';
import Login from './comonents/login';
import SignUP from './comonents/signup';


import Navigation  from './comonents/navigation';
function App() {
  return (
    <div className="App">

        <header>
          <Navigation/>
        </header>

      
        <BrowserRouter>
        <Routes>
                <Route path='/login' exact element={<Login /> }>
                </Route>
                <Route path='/signup' element={<SignUP/>}/> 
        </Routes>
        
          

        </BrowserRouter>

    </div>
  );
}

export default App;
