import React, { useEffect } from 'react';
import './App.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useStateValue } from './functions/Utils/StateProvider';
import { actionTypes } from "./functions/Utils/Reducer";
import Signup from './components/Auth/Signup/Signup';
import Login from './components/Auth/Login/Login';
import DisplayUser from './components/Admin/UserManagement/DisplayUser/DisplayUser';
import EditUser from './components/Admin/UserManagement/EditUser/EditUser';
import AddVenue from './components/Admin/VenueManagement/AddVenue/AddVenue';
import ViewVenue from './components/Admin/VenueManagement/ViewVenue/ViewVenue';


function App() {
  const [{user, userType}, dispatch] = useStateValue();

  const logoutUser = () => {
    dispatch({
      type: actionTypes.SET_USER,
      user: null,
      userType: null
    })
    AsyncStorage.clear()

  }

  useEffect(() => {
    if (user) {
      AsyncStorage.setItem('USER', JSON.stringify({
        user:`${user}`,
        userType: `${userType}`
      }));
    }else{
      AsyncStorage.getItem('USER').then((value) => {
        if (value) {
          value = JSON.parse(value)
          dispatch({
            type: actionTypes.SET_USER,
            user: value.user,
            userType: value.userType
          })
        }
      });
    }
  }, [user]);

  return (
    <div className="App">
      <Router>
        {!user ? (
          <Routes>
            <Route exact path = "/user/signup" element={<Signup/>}/>
            <Route exact path="/user/login" element={<Login/>}/>
            <Route exact path="/" element={<Navigate replace to="/user/login"/>}/>
            <Route exact path="/login" element={<Navigate replace to="/user/login"/>}/>
            <Route exact path="/admin/login" element={<Navigate replace to="/user/login"/>}/>
          </Routes>
        ):(
          <>
          {
            userType === 'user' ? (
              <> 
              <h1>User</h1>
              <button onClick={() => logoutUser()}>Logout</button>
              </>
            ) : (
              <>
                <Routes>
                  <Route exact path = "/admin/displayUsers" element={<DisplayUser />}/>
                  <Route exact path = "/admin/editUser" element={<EditUser />}/>
                  <Route exact path = "/admin/addVenue" element={<AddVenue/>}/>
                  <Route exact path = "/admin/viewVenue" element={<ViewVenue/>}/>
                  <Route exact path = "/admin" element={<Navigate replace to="/admin/displayUsers"/>}/>
                </Routes>
              </>
              // <></>
            )
          }  
          </>        
        )}
      </Router>
    </div>
  );
}

export default App;
