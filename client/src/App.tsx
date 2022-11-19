import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { onMessageListener } from './firebase';

import { Toast } from 'react-bootstrap';

import { getAllSubs } from './api-service/api-service';
import { Routes, Route } from 'react-router-dom';

import Home from './components/home';
import AddSubForm from './components/add-sub-form';
import EditSubItem from './components/edit-sub-form';
import { Subscription } from './types';


function App() {
  console.log(process.env.REACT_APP_FIREBASE_API_KEY)

  const [subscriptions, setSubs] = useState<Array<Subscription> | undefined>();

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: '', body: '' });

  onMessageListener().then((payload: any) => {
    setShow(true);
    console.log('Received foreground message ', payload);
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
          <Route path='/' element={<Home subscriptions={subscriptions} />} />
          <Route path='/add' element={<AddSubForm />} />
          <Route path='/edit-sub/:id' element={<EditSubItem subscriptions={subscriptions} />} />
        </Routes>
      </Router>
    </div>

  </>);
}

export default App;
