// This configures the apostrophe-users module to add an admin-level
// group by default:

module.exports = {
  groups: [
    {
      title: 'guest',
      permissions: [],
    },
    {
      title: 'edit',
      permissions: ['edit'],
    },
    {
      title: 'admin',
      permissions: ['admin'],
    },
  ],
  addFields: [
    {
      name: 'thumbnail',
      type: 'singleton',
      widgetType: 'apostrophe-images',
      label: 'Picture',
      options: {
        limit: 1,
        aspectRatio: [100, 100],
      },
    },
    {
      name: 'bio',
      type: 'string',
      label: 'Bio',
    },
  ],
};
