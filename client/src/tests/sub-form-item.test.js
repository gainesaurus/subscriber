import { fireEvent, render, screen } from "@testing-library/react"
import SubFormItem from '../components/sub-form-item';
import userEvent from '@testing-library/user-event'
import { subItemForm } from "./mocks";

describe('Sub form item tests', () => {
  let subForm;

  beforeEach(() => {
    subForm = { ...subItemForm };
  })

  it('Should render SubFormItem label correctly', async () => {
    render(<SubFormItem
      label={subForm.label}
      data={subForm.data}
      onChange={(e) => subForm.data = e.target.value}
      type='string'
    />
    )
    const label = await screen.findByText(subForm.label)
    expect(label).toBeInTheDocument()
    expect(label.innerHTML).toBe(subForm.label)
  })

  it('Should render SubFormItem inputBox correctly', async () => {
    render(<SubFormItem
      label={subForm.label}
      data={subForm.data}
      onChange={(e) => subForm.data = e.target.value}
      type='string'
    />
    )
    const inputBox = await screen.findByDisplayValue(subForm.data)
    expect(inputBox).toBeInTheDocument()
    fireEvent.change(inputBox, { target: { value: 'This is a new value' } })
    expect(subForm.data).toBe('This is a new value')
  })
})