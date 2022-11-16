import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getMessageToken, onMessageListener } from './firebase';

import { Toast } from 'react-bootstrap';

import ApiService from './api-service/api-service'
import Dashboard from './components/dashboard';

function App() {

  const [subscriptions, setSubs] = useState([]);

  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({title:'', body:''});

  onMessageListener().then(payload => {
    setShow(true);
    console.log('Received foreground message ', payload);
    setNotification({title: payload.data.title, body: payload.data.body});
  }).catch((err)=>{console.log('Error in onMessageListener', err)})

  useEffect(() => {
    postOrEditToken(1234) //testing backend.. param should be User ID.
    getAllSubs()
  }, []);

  async function postOrEditToken(userId) {
    //generate client token.
    const clientToken = await getMessageToken();
    //save token to db.
    ApiService.putToken(clientToken, userId);
  }

  async function getAllSubs() {
    const subs = await ApiService.getAllSubs();
    console.log(subs);
    setSubs(subs);
  }

  async function postNewSub(formData) {
    const newSub = await ApiService.postNewSub(formData);
    setSubs([...subscriptions, newSub])
  }

  async function editSub(editedFormData) {
    const editedSub = await ApiService.editSub(editedFormData);
    console.log(editedSub);
    subscriptions.map((subs) => {
      return subs._id === editedFormData.id ? Object.assign(subs, editedSub) : subs;
    })
    setSubs([...subscriptions]);
  }

  async function deleteSub(uid) {
    await ApiService.deleteSub(uid);
    const filteredSubs = subscriptions.filter((sub) => {
      return sub._id !== uid;
    })
    setSubs([...filteredSubs]);
  }

  return (<>
    <Toast className='toast-notify' onClose={()=> setShow(false)}
    show={show} delay={9000} animation autohide>
      {/* <Toast.Header>
      </Toast.Header> */}
        <img src='https://res.cloudinary.com/dovw0n8pd/image/upload/v1668541517/icon_wahvgw.png' alt='logo' width='70' height='70'/>
      <Toast.Body>
      <div className='toast-info'>
        <strong className='notify-title'>{notification && notification.title}</strong>
        {notification && notification.body}
      </div>
      </Toast.Body>
    </Toast>

    <div className='app-body'>
      <Router>
        <Dashboard postNewSub={postNewSub} editSub={editSub} deleteSub={deleteSub} subscriptions={subscriptions}/>
      </Router>
    </div>

  </>);
}

export default App;
