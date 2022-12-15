import { render, screen } from "@testing-library/react"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import EditSubItem from "../components/edit-sub-form"
import { mockSubItem } from "./mocks";

describe('Add subscription form tests', () => {
  let subscriptionList;

  beforeEach(() => {
    subscriptionList = [...mockSubItem]
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ id: '12' })
    }));
  });

  it('Should render form properly', async () => {
    render(
      <MemoryRouter initialEntries={['/edit-sub/12']}>
        <Routes>
          <Route path='/edit-sub/:id' element={<EditSubItem subscriptions={subscriptionList} />} />
        </Routes>
      </MemoryRouter>
    )
    const title = await screen.findByDisplayValue(subscriptionList[0].title)
    expect(title).toBeInTheDocument();
  })

  it('Should have edit and delete subscription button', async () => {
    render(
      <MemoryRouter initialEntries={['/edit-sub/12']}>
        <Routes>
          <Route path='/edit-sub/:id' element={<EditSubItem subscriptions={subscriptionList} />} />
        </Routes>
      </MemoryRouter>
    )
    const editBtn = await screen.findByText(/Edit Subscription/)
    expect(editBtn).toBeInTheDocument()
    const deleteBtn = await screen.findByText(/Delete Subscription/)
    expect(deleteBtn).toBeInTheDocument()
  })


})