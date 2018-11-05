module.exports = [{
  tableName: 'action_points',
  item: 'ActionPoint',
  attributes: [
    { name: 'description', type: 'String', required: true },
    { name: 'created_at', type: 'String' },
    { name: 'archived_at', type: 'String' },
    { name: 'due_date', type: 'String' },
    { name: 'sprint', type: 'String' },
    { name: 'state', type: 'String', required: true },
    { name: 'team', type: 'String' },
    { name: 'actions_taken', type: 'String' },
    { name: 'owners', type: '[String]' },
  ],
  queries: [
    { type: 'get' },
    { type: 'index' },
    {
      type: 'custom',
      name: 'actionPointsByTeam',
      attributes: [
        {
          name: 'team',
          type: 'String',
          required: true,
        },
      ],
      returnType: 'collection',
    },
  ],
  mutations: [
    {
      type: 'create',
      attributes: [
        { name: 'description', type: 'String!' },
        { name: 'state', type: 'String!' },
        { name: 'archived_at', type: 'String' },
        { name: 'due_date', type: 'String' },
        { name: 'sprint', type: 'String' },
        { name: 'team', type: 'String!' },
        { name: 'actions_taken', type: 'String' },
        { name: 'owners', type: '[String]' },
      ],
    },
    {
      type: 'update',
      attributes: [
        { name: 'state', type: 'String' },
        { name: 'actions_taken', type: 'String' },
        { name: 'archived_at', type: 'String' },
      ],
    },
    {
      type: 'delete',
    },
  ],
},
{
  item: 'SubTask',
  attributes: [
    { name: 'title', type: 'String', required: true },
  ],
},
{
  tableName: 'tasks',
  item: 'Task',
  attributes: [
    { name: 'title', type: 'String', required: true },
    { name: 'description', type: 'String', required: true },
  ],
  queries: [
    { type: 'get' },
    { type: 'index' },
  ],
  mutations: [
    {
      type: 'create',
      attributes: [
        { name: 'description', type: 'String!' },
        { name: 'title', type: 'String!' },
      ],
    },
    {
      type: 'update',
      attributes: [
        { name: 'description', type: 'String' },
        { name: 'title', type: 'String' },
      ],
    },
    {
      type: 'delete',
    },
  ],
}];
