import { render, screen } from "@testing-library/react"
import { BrowserRouter } from "react-router-dom"
import AddSubForm from "../components/add-sub-form"

describe('Add subscription form tests', () => {

  it('Should render empty form properly', async () => {
    render(<AddSubForm />, { wrapper: BrowserRouter })
    const title = await screen.findByDisplayValue(/Title here/)
    expect(title).toBeInTheDocument();
  })

  it('Should have add subscription button', async () => {
    render(<AddSubForm />, { wrapper: BrowserRouter })
    const addBtn = await screen.findByText(/Add Subscription/)
    expect(addBtn).toBeInTheDocument()
  })


})