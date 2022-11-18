import './add-sub-form.css';
import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import ApiService from '../api-service/api-service'

import 'react-datalist-input/dist/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import {Subscription} from '../types'

type Props = {
  postNewSub:(formData:Subscription) => void
}

function AddSubForm({ postNewSub }:Props) {
  const [imageFile, setImageFile] = useState('');
  const [binaryFile, setBinaryFile] = useState('./add-image-icon.png');

  const [price, setPrice] = useState(0.00);
  const [title, setTitle] = useState('Title here');
  const [start, setStart] = useState('');
  const [cycle, setCycle] = useState('Choose Cycle');
  const [reminderDate, setReminderDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()


    // IMPORT AND USE MOMENT TO REPLACE DATE FUNCTIONS
    // ALL DATES ARE STORED IN ISO FORMAT ON DB
    // new Date().toISOString()
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateTime = new Date( start );
    let year = dateTime.getFullYear()
    let month = months[dateTime.getMonth()];
    let day = dateTime.getDate()
    if (day < 10) day = '0'+ day;
    const prettyStart = `${month} ${day}, ${year}`;

    const dateToBeReminded = await convertTimeZone();
    const imgData = await uploadImage();
    postNewSub({
      'icon': imgData.url,
      'price': price,
      'title': title,
      'start': start,
      'prettyStart': prettyStart,
      'cycle': cycle,
      'reminderDate': dateToBeReminded,
    });

    if(reminderDate) {
      const delay = await convertReminderToSeconds();
      console.log(delay);
      ApiService.postSubNotification({
        'userId': 1234, //for testing purposes
        'title': title,
        'price': price,
        'delay': delay,
      })
    }
    setPrice(0);
    setTitle('');
    setStart('');
    setBinaryFile(null);
    //go back to home
    navigate('/');
  }

  const imageUploader = React.useRef(null);
  const uploadImage = async () => {
    const data = new FormData()
    data.append('file', imageFile)
    data.append('upload_preset', 'subscription-icon')
    data.append('cloud_name', 'dovw0n8pd')
    let imgData = await fetch('https://api.cloudinary.com/v1_1/dovw0n8pd/image/upload', {
      method:'POST',
      body: data
    })
    imgData = await imgData.json();
    return imgData;
  }
  const convertReminderToSeconds = async () => {
    //reminder date milliseconds
    const date = new Date(reminderDate);
    const  reminderMillis = date.getTime();
    //now milliseconds
    const now = Date.now();
    //time until reminder in seconds
    const delay = reminderMillis - now;
    return delay;
  }

  const convertTimeZone = async () => {
    let timeZoneOffSet = (new Date()).getTimezoneOffset() * 60000; //off set in milliseconds
    let date = new Date(reminderDate);
    let convertedDate = date.getTime() - timeZoneOffSet;
    convertedDate = new Date(convertedDate);
    return convertedDate;
  }

  function getDate() {
    let timeZoneOffSet = (new Date()).getTimezoneOffset() * 60000; //off set in milliseconds
    let localDateTime = (new Date(Date.now()-timeZoneOffSet));
    let formatted = localDateTime.toISOString().slice(0, 16);
    return formatted;
  }
  let date = getDate();

  return (<>
  <div className='form-cont'>
    <form onSubmit={handleSubmit}>

      <section className='add-sub-header'>
          <input
            type='file'
            accept='image/*'
            multiple={false}
            onChange={(e) => {
              setBinaryFile(URL.createObjectURL(e.target.files[0]));
              setImageFile(e.target.files[0]);
            }}
            ref={imageUploader}
            style={{display:'none'}}
          ></input>
          <div className='icon-display' onClick={()=> imageUploader.current.click()}>
            <img className='icon' src={binaryFile} alt='Add Icon'/>
          </div>

          <label className='form-input-label'>$</label>{/*want to make this currency option*/}
          <input className='form-input-box'
            type='number'
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            onClick={()=>setPrice('')}
          ></input>
          <Link to='/'><FontAwesomeIcon icon={faChevronLeft} className='back-btn' /></Link>

      </section>

      {/* FORM BODY */}
      <div className='form-body'>
        <section className='form-input'>
          <label className='form-input-label'>Title:</label>
            <input className='form-input-box'
              type='text'
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              onClick={()=>setTitle('')}
            ></input>
        </section>

        <section className='form-input'>
          <label className='form-input-label'>First Payment: </label>
            <input className='form-input-box'
              type='date'
              max={date}
              value={start}
              onChange={(e)=>setStart(e.target.value)}
            ></input>
        </section>

        <section className='form-input'>
          <label className='form-input-label'>Cycle:</label>
            <input className='form-input-box'
              type='text'
              list='cycleData'
              value={cycle}
              onChange={(e)=>setCycle(e.target.value)}
              onClick={()=>setCycle('')}
            />
            <datalist id='cycleData'>
              <option value='Monthly'/>
              <option value='Annually'/>
            </datalist>

        </section>

        <section className='form-input'>
          <label className='form-input-label'>Remind Me:</label>
            <input className='form-input-box'
              type='datetime-local'
              value={reminderDate}
              min={date}
              onChange={(e)=>{
              setReminderDate(e.target.value)
              console.log(reminderDate)
              }}
            ></input>
        </section>
        <button className='submit-form-btn' type="submit">Add Subscription</button>

      </div>


    </form>
  </div>


</>);
}

export default AddSubForm;