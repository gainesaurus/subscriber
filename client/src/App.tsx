import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { onMessageListener } from './firebase';
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Toast } from 'react-bootstrap';

import { getAllSubs } from './api-service/api-service';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import Home from './components/home';
import AddSubForm from './components/add-sub-form';
import EditSubItem from './components/edit-sub-form';
import { Subscription } from './types';


function App() {
  const [user] = useAuthState(auth);
  const [subscriptions, setSubs] = useState<Subscription[] | undefined>();
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener().then((payload: any) => {
    setShow(true);
    setNotification({ title: payload.data.title, body: payload.data.body });
  }).catch((err) => { console.log('Error in onMessageListener', err) })

  useEffect(() => {
    getAllSubs().then((subs) => setSubs(subs))
  }, []);

  return (<>
    <Toast className='toast-notify' onClose={() => setShow(false)}
      show={show} delay={9000} animation autohide>
      {/* <Toast.Header>
      </Toast.Header> */}
      <img src='https://res.cloudinary.com/dovw0n8pd/image/upload/v1668541517/icon_wahvgw.png' alt='logo' width='70' height='70' />
      <Toast.Body>
        <div className='toast-info'>
          <strong className='notify-title'>{notification && notification.title}</strong>
          {notification && notification.body}
        </div>
      </Toast.Body>
    </Toast>

    <div className='app-body'>
      <Router>
        <Routes>
          <Route path='/' element={user ? <Home subscriptions={subscriptions} /> : <Login />} />
          <Route path='/add' element={user ? <AddSubForm /> : <Login />} />
          <Route path='/edit-sub/:id' element={user ? <EditSubItem subscriptions={subscriptions} /> : <Login />} />
          {/* <Route path='/register' element={<Register />} /> */}
        </Routes>
      </Router>
    </div>

  </>);
}

export default App;
