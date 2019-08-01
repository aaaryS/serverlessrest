const configExport = [{
  type: 'enum',
  name: 'TaskType',
  values: ['MAIN', 'SUBTASK', 'ARCHIVED'],
}, {
  tableName: 'tasks',
  item: 'Task',
  attributes: [
    { name: 'title', type: 'String', required: true },
    { name: 'description', type: 'String', required: true },
  ],
  queries: [
    { type: 'get' },
    { type: 'index' },
    {
      type: 'custom',
      name: 'tasksByTitle',
      attributes: [
        {
          name: 'title',
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
        { name: 'title', type: 'String!' },
      ],
    },
  ],
}];

global.configExport = configExport

module.exports = configExport
