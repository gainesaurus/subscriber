import React, { useState } from 'react';
import './sub-form.css';
import { Link, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Notification, Subscription } from '../types';
import { postSubNotification, deleteSub, editSub, postNewSub } from '../api-service/api-service';
import SubFormItem from './sub-form-item';

type Props = {
  subscription?: Subscription
}

function SubForm({ subscription }: Props) {

  let initialState: Subscription;
  let apiServiceMethod: (formData: Subscription) => void;

  if (subscription) {
    initialState = subscription;
    apiServiceMethod = editSub
  }
  else {
    initialState = {
      icon: './add-image-icon.png',
      price: 0,
      title: 'Title here',
      start: '',
      cycle: 'Choose Cycle',
      reminderDate: '',
      prettyStart: '',
    };
    apiServiceMethod = postNewSub
  }

  const [imageFile, setImageFile] = useState('');
  const [sub, setSub] = useState(initialState)
  const navigate = useNavigate();
  const imageUploader = React.useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let dateTime = new Date(sub.start);
    const prettyStart = dateTime.toDateString();
    const imgData = await uploadImage();

    apiServiceMethod({
      icon: imgData.url,
      price: sub.price,
      title: sub.title,
      start: sub.start,
      prettyStart,
      cycle: sub.cycle,
      reminderDate: new Date(sub.reminderDate).toISOString(),
      _id: subscription?._id,
    });

    if (sub.reminderDate) {
      const delay = (new Date().getTime() - new Date(sub.reminderDate).getTime()) / 1000
      const notification: Notification = {
        userId: '1234', //for testing purposes
        title: sub.title,
        price: sub.price,
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
              setSub({ ...sub, icon: URL.createObjectURL(e.target.files![0]) });
              setImageFile(e.target.files![0].name);
            }}
            ref={imageUploader}
            style={{ display: 'none' }}
          ></input>
          <div className='icon-display' onClick={() => { if (imageUploader.current) { imageUploader.current.click() } }}>
            <img className='icon' src={sub.icon} alt='Add Icon' />
          </div>
          <SubFormItem
            label='$'
            data={sub.price}
            onChange={(e) => setSub({ ...sub, price: parseInt(e.target.value) })}
            type='number'
            hasSection={false} />
          <Link to='/'><FontAwesomeIcon icon={faChevronLeft} className='back-btn' /></Link>
        </section>

        {/* FORM BODY */}
        <div className='form-body'>
          <SubFormItem
            label='Title: '
            data={sub.title}
            onChange={(e) => setSub({ ...sub, title: e.target.value })}
            type='string' />
          <SubFormItem
            label='First Payment: '
            data={sub.start}
            onChange={(e) => setSub({ ...sub, start: e.target.value })}
            type='date' />
          <SubFormItem
            label='Cycle: '
            data={sub.cycle}
            onChange={(e) => setSub({ ...sub, cycle: e.target.value })}
            dataList={true}
            type='text' />
          <SubFormItem
            label='Remind Me: '
            data={sub.reminderDate}
            onChange={(e) => setSub({ ...sub, reminderDate: e.target.value })}
            type='datetime-local'
            min={new Date(Date.now()).toISOString()}
          />
          <section>
            {subscription ? <button className='submit-form-btn' type='button' onClick={() => handleDelete()}>Delete Subscription</button> : null}
            <button className='submit-form-btn' type='submit' >{subscription ? 'Edit' : 'Add'} Subscription</button>
          </section>
        </div>
      </form>
    </div>
  )
}

export default SubForm
