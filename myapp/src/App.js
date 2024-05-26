import { useState } from 'react';

import Addassets from './components/Addassets';
import NavBar from './components/NavBar';
import Home from './components/Home';
import Editassets from './components/Editasset';
import Login from './components/account/Login';



import DataProvider from './context/DataProvider';

import { BrowserRouter, Routes,Route, Outlet,Navigate} from 'react-router-dom';

const PrivateRoute =({isAuthenticated,...props}) =>{
  return isAuthenticated ?
  <>
    <NavBar />
    <Outlet></Outlet>
  </>
  : <Navigate replace to ='/login'/>
}

function App() {

  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <DataProvider>
      <BrowserRouter>
      
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated = {isUserAuthenticated}/>}/>
            <Route path ='/' element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
              <Route path='/' element={<Home/>} />
              <Route path='/add' element={<Addassets />} />
              <Route path='edit/:id' element={<Editassets />} />
            </Route>
          </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

 export default App;
// <Route path='/' element={<Home />} />
//         