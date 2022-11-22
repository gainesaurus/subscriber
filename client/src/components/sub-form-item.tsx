import React from 'react'
import './sub-form-item.css';

function SubFormItem({ label, data, onChange, dataList, type, min, hasSection }: Props) {
  return (<>
    {hasSection ?
      <section className='form-input'>
        <label className='form-input-label'>{label}</label>
        <input className='form-input-box'
          data-testid="form-input-box"
          type={type}
          min={min ? min : undefined}
          list={dataList ? 'cycleData' : undefined}
          value={data}
          onChange={onChange}
        />
        {dataList ?
          <datalist id='cycleData'>
            <option value='Monthly' />
            <option value='Annually' />
          </datalist> : null}
      </section> :
      <>
        <label className='form-input-label'>{label}</label>
        <input className='form-input-box'
          data-testid="form-input-box"
          type={type}
          min={min ? min : undefined}
          list={dataList ? 'cycleData' : undefined}
          value={data}
          onChange={onChange}
        />
        {dataList ?
          <datalist id='cycleData'>
            <option value='Monthly' />
            <option value='Annually' />
          </datalist> : null}
      </>
    }
  </>
  )
}

type Props = {
  label: string;
  data: string | number;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  dataList?: boolean;
  type: string;
  min?: string;
  hasSection?: boolean;
}

export default SubFormItem;