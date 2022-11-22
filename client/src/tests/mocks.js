export const mockSubItem = [
  {
    _id: '12',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/netflix_macos_bigsur_icon_189917.png',
    price: 12.00,
    title: 'Netflix',
    start: new Date(2022, 11, 21, 19),
    prettyStart: new Date(2022, 11, 21, 19).toISOString(),
    cycle: 'Monthly',
    reminderDate: new Date(2022, 11, 21, 19)
  },

  {
    _id: '13',
    icon: 'https://cdn.icon-icons.com/icons2/3053/PNG/512/netflix_macos_bigsur_icon_189917.png',
    price: 140.00,
    title: 'Other Netflix',
    start: new Date(2022, 11, 21, 19),
    prettyStart: new Date(2022, 11, 21, 19).toISOString(),
    cycle: 'Annually',
    reminderDate: new Date(2022, 11, 21, 19)
  }
]

export const subItemForm = {
  label: 'This is a label',
  data: 'This is an old value'
}