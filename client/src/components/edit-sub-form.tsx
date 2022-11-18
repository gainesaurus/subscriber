
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'
import ApiService from '../api-service/api-service';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from '../types';

type Props = {
  subscriptions:Array<Subscription>;
  editSub: (formData:Subscription)=>void;
  deleteSub: (id:string)=>void;
}

function EditSubItem({ subscriptions, editSub, deleteSub }:Props) {
  ///this whole component should be shared with add sub form - most was copy pasted for time
  const { id } = useParams();
  const [currentSub, setCurrentSub] = useState<Subscription | undefined>(undefined);

  const [imageFile, setImageFile] = useState('');
  const [binaryFile, setBinaryFile] = useState('');
  const [price, setPrice] = useState(0);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [cycle, setCycle] = useState('');
  const [reminderDate, setReminderDate] = useState('');
  const navigate = useNavigate();

  useEffect(()=>{
    getCurrentSub();
  }, []);

  const getCurrentSub = async () => {
    if (subscriptions.length) {
      console.log(subscriptions);
      const sub = subscriptions.filter((subItem) => subItem._id === id)[0];

      const startDate = sub.start.slice(0, 10);
      setStart(startDate)
      const reminder = sub.reminderDate.slice(0, 16);
      setReminderDate(reminder)

      //console.log(sub.reminderDate);

      setCurrentSub(sub)
      setBinaryFile(sub.icon)
      setTitle(sub.title)
      setPrice(sub.price)
      setCycle(sub.cycle)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // IMPORT MOMENT AND REFACTOR
    const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    let dateTime = new Date( start );
    let year = dateTime.getFullYear()
    let month = months[dateTime.getMonth()];
    let day = dateTime.getDate()
    if (day < 10) day = '0'+ day;
    const prettyStart = `${month} ${day}, ${year}`;

    const dateToBeReminded = await convertTimeZone();
    const imgData = await uploadImage();
    editSub({
      'icon': imgData.url,
      'price': price,
      'title': title,
      'start': start,
      'prettyStart': prettyStart,
      'cycle': cycle,
      'reminderDate': dateToBeReminded,
      'id': currentSub._id,
    });

    if(reminderDate) {
      const delay = await convertReminderToSeconds();
      ApiService.postSubNotification({
        'userId': 1234, //for testing purposes
        'title': title,
        'price': price,
        'delay': delay,
      })
    }
    navigate('/');
  }

  const handleDelete = () => {
    if (id) deleteSub({id});
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

  const convertTimeZone = async () => {
    let timeZoneOffSet = (new Date()).getTimezoneOffset() * 60000; //off set in milliseconds
    let convertedDate = reminderDate - timeZoneOffSet;
    console.log(convertedDate, timeZoneOffSet);
    return convertedDate;
  }

  const convertReminderToSeconds = async () => {
    const date = new Date(reminderDate);
    const  reminderMillis = date.getTime();
    const now = Date.now();
    const delay = reminderMillis - now;
    return delay;
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

          <label className='form-input-label'>$</label>
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
              onChange={(e)=>setReminderDate(e.target.value)}
            ></input>
        </section>
        <section>
          <button className='submit-form-btn' type='button' onClick={()=>handleDelete()}>Delete Subscription</button>
          <button className='submit-form-btn' type='submit' >Edit Subscription</button>
        </section>
      </div>
    </form>
  </div>



</>);
}

export default EditSubItem;
