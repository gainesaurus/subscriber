import React, { useState } from 'react';
import './sub-form.css';
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Notification, Subscription } from '../types';
import { postSubNotification, deleteSub } from '../api-service/api-service';
import SubFormItem from './sub-form-item';

type Props = {
  apiServiceMethod: (formData: Subscription) => void;
  subscription?: Subscription
}

function SubForm({ apiServiceMethod, subscription }: Props) {

  let initialState = {
    imageURL: './add-image-icon.png',
    price: 0,
    title: 'Title here',
    start: '',
    cycle: 'Choose Cycle',
    reminderDate: '',
  };
  if (subscription) initialState = {
    imageURL: subscription.icon,
    price: subscription.price,
    title: subscription.title,
    start: subscription.start,
    cycle: subscription.cycle,
    reminderDate: subscription.reminderDate,
  };

  const [imageFile, setImageFile] = useState('');
  const [imageURL, setImageURL] = useState(initialState.imageURL);
  const [price, setPrice] = useState(initialState.price);
  const [title, setTitle] = useState(initialState.title);
  const [start, setStart] = useState(initialState.start);
  const [cycle, setCycle] = useState(initialState.cycle);
  const [reminderDate, setReminderDate] = useState(initialState.reminderDate);
  const navigate = useNavigate();
  const imageUploader = React.useRef<HTMLInputElement>(null);

  // HELPER FUNCTIONS, DO WE STILL ALL NEED THIS?
  const convertTimeZone = async () => {
    let timeZoneOffSet = (new Date()).getTimezoneOffset() * 60000; //off set in milliseconds
    let convertedDate = new Date(reminderDate).getTime() - timeZoneOffSet;
    return convertedDate;
  }

  const convertReminderToSeconds = async () => {
    const date = new Date(reminderDate);
    const reminderMillis = date.getTime();
    const now = Date.now();
    const delay = reminderMillis - now;
    return delay;
  }

  function getDate() {
    let timeZoneOffSet = (new Date()).getTimezoneOffset() * 60000; //off set in milliseconds
    let localDateTime = (new Date(Date.now() - timeZoneOffSet));
    let formatted = localDateTime.toISOString().slice(0, 16);
    return formatted;
  }
  let date = getDate();

  const uploadImage = async () => {
    const data = new FormData()
    data.append('file', imageFile)
    data.append('upload_preset', 'subscription-icon')
    data.append('cloud_name', 'dovw0n8pd')
    let imgData = await fetch('https://api.cloudinary.com/v1_1/dovw0n8pd/image/upload', {
      method: 'POST',
      body: data
    })
    imgData = await imgData.json();
    return imgData;
  }
  // END OF HELPER FUNCTIONS

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let dateTime = new Date(start);
    const prettyStart = dateTime.toDateString();
    const dateToBeReminded = await convertTimeZone();
    const imgData = await uploadImage();

    apiServiceMethod({
      icon: imgData.url,
      price,
      title,
      start,
      prettyStart,
      cycle,
      reminderDate: new Date(dateToBeReminded).toISOString(),
      _id: subscription?._id,
    });

    if (reminderDate) {
      const delay = await convertReminderToSeconds();
      const notification: Notification = {
        userId: '1234', //for testing purposes
        title: title,
        price: price,
        delay: delay,
      }
      postSubNotification(notification)
    }
    navigate('/');
  }

  const handleDelete = () => {
    if (subscription?._id) deleteSub(subscription._id.toString());
    navigate('/');
  }

  return (
    <div className='form-cont'>
      <form onSubmit={handleSubmit}>
        <section className='add-sub-header'>
          <input
            type='file'
            accept='image/*'
            multiple={false}
            onChange={(e) => {
              setImageURL(URL.createObjectURL(e.target.files![0]));
              setImageFile(e.target.files![0].name);
            }}
            ref={imageUploader}
            style={{ display: 'none' }}
          ></input>
          <div className='icon-display' onClick={() => { if (imageUploader.current) { imageUploader.current.click() } }}>
            <img className='icon' src={imageURL} alt='Add Icon' />
          </div>
          <SubFormItem
            label='$'
            data={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            type='number'
            hasSection={false} />
          <Link to='/'><FontAwesomeIcon icon={faChevronLeft} className='back-btn' /></Link>
        </section>

        {/* FORM BODY */}
        <div className='form-body'>
          <SubFormItem
            label='Title: '
            data={title}
            onChange={(e) => setTitle(e.target.value)}
            type='string' />
          <SubFormItem
            label='First Payment: '
            data={start}
            onChange={(e) => setStart(e.target.value)}
            type='date' />
          <SubFormItem
            label='Cycle: '
            data={cycle}
            onChange={(e) => setCycle(e.target.value)}
            dataList={true}
            type='text' />
          <SubFormItem
            label='Remind Me: '
            data={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
            type='datetime-local'
            min={date}
          />
          <section>
            <button className='submit-form-btn' type='button' onClick={() => handleDelete()}>Delete Subscription</button>
            <button className='submit-form-btn' type='submit' >Edit Subscription</button>
          </section>
        </div>
      </form>
    </div>
  )
}

export default SubForm
