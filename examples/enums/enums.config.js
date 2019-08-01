const configExport = [{
  type: 'enum',
  name: 'TaskType',
  values: ['MAIN', 'SUBTASK', 'ARCHIVED'],
}, {
  tableName: 'tasks',
  item: 'Task',
  auth: true,
  attributes: [
    { name: 'title', type: 'String', required: true },
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
        { name: 'title', type: 'String!' },
        { name: 't_type', type: 'TaskType', required: true },
      ],
    },
  ],
}];

global.configExport = configExport

module.exports = configExport
