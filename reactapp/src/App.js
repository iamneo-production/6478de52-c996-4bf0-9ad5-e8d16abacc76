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
import DisplayEvents from './components/User/DisplayEvents/DisplayEvents';
import BookEvent from './components/User/BookEvent/BookEvent';
import CreateEvent from './components/Organizer/CreateEvent/CreateEvent';


function App() {
  const [{user, userType}, dispatch] = useStateValue();

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
        {user ? (
          <>
          {
            userType === 'user' ? (
              <> 
                <Routes>
                  <Route exact path = "/user/bookEvent" element={<BookEvent/>}/>
                  <Route exact path = "/user/displayEvents" element={<DisplayEvents />}/>
                  <Route exact path = "/user" element={<Navigate replace to="/user/displayEvents"/>}/>
                  <Route exact path = "/" element={<Navigate replace to="/user/displayEvents"/>}/>
                </Routes>
              </>
            ) : (
              userType === 'organizer' ? (
                <>
                  <Routes>
                    <Route exact path = "/organizer/createEvent" element={<CreateEvent/>}/>
                    <Route exact path = "/organizer/displayEvents" element={<DisplayEvents/>}/>
                    <Route exact path = "/organizer" element={<Navigate replace to="/organizer/displayEvents"/>}/>
                    <Route exact path = "/" element={<Navigate replace to="/organizer/displayEvents"/>}/>
                  </Routes>
                </>
              ) : (
                <>
                  <Routes>
                    <Route exact path = "/admin/displayUsers" element={<DisplayUser />}/>
                    <Route exact path = "/admin/editUser" element={<EditUser />}/>
                    <Route exact path = "/admin" element={<Navigate replace to="/admin/displayUsers"/>}/>
                    <Route exact path = "/" element={<Navigate replace to="/admin/displayUsers"/>}/>
                  </Routes>
                </>
              )
            )
          }  
          </>
        ):(
          <Routes>
            <Route exact path = "/user/signup" element={<Signup/>}/>
            <Route exact path="/user/login" element={<Login/>}/>
            <Route exact path="/login" element={<Navigate replace to="/user/login"/>}/>
            <Route exact path="/user" element={<Navigate replace to="/user/login"/>}/>
            <Route exact path="/admin" element={<Navigate replace to="/user/login"/>}/>
            <Route exact path="/admin/login" element={<Navigate replace to="/user/login"/>}/>
            <Route exact path="/" element={<Navigate replace to="/user/login"/>}/>
          </Routes>      
        )}
      </Router>
    </div>
  );
}

export default App;
