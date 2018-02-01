module.exports = {
  extend: 'apostrophe-pieces',
  name: 'message',
  label: 'Message',
  pluralLabel: 'Messages',
  addFields: [
    {
      name: 'title',
      label: 'Name',
      type: 'string',
      required: true
    },
    {
      name: 'email',
      type: 'string',
      required: true
    },
    {
      name: 'subject',
      type: 'string',
      required: true
    },
    {
      name: 'details',
      type: 'string',
      required: true
    }
  ],

  arrangeFields: [
    { name: 'basics', label: 'Message Details', fields: ['title', 'email', 'subject', 'details'] },
  ],

}
