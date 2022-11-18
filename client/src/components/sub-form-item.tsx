import React from 'react'

function subFormItem({ label, }) {
  return (
    <section className='form-input'>
      <label className='form-input-label'>Cycle:</label>
      <input className='form-input-box'
        type='text'
        list='cycleData'
        value={cycle}
        onChange={(e) => setCycle(e.target.value)}
        onClick={() => setCycle('')}
      />
      <datalist id='cycleData'>
        <option value='Monthly' />
        <option value='Annually' />
      </datalist>

    </section>
  )
}

export default subFormItem