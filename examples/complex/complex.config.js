const configExport = [{
  tableName: 'epics',
  item: 'Epic',
  attributes: [
    { name: 'description', type: 'String', required: true },
    { name: 'created_at', type: 'String' },
    { name: 'archived_at', type: 'String' },
    { name: 'due_date', type: 'String' },
    { name: 'sprint', type: 'String' },
  ],
  queries: [
    { type: 'get' },
    { type: 'index' },
    {
      type: 'custom',
      name: 'epicsBySprint',
      attributes: [
        {
          name: 'sprint',
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
        { name: 'archived_at', type: 'String' },
        { name: 'due_date', type: 'String' },
        { name: 'sprint', type: 'String' },
      ],
    },
    {
      type: 'update',
      attributes: [
        { name: 'description', type: 'String' },
        { name: 'sprint', type: 'String' },
      ],
    },
    {
      type: 'delete',
    },
  ],
},
{
  type: 'enum',
  name: 'TaskType',
  values: ['MAIN', 'SUBTASK', 'ARCHIVED'],
},
{
  tableName: 'tasks',
  item: 'Task',
  auth: true,
  attributes: [
    { name: 'title', type: 'String', required: true },
    { name: 'description', type: 'String', required: true },
    { name: 't_type', type: 'TaskType' },
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
        { name: 't_type', type: 'TaskType', required: true },
      ],
    },
    {
      type: 'delete',
    },
  ],
}];

global.configExport = configExport;

module.exports = configExport;
