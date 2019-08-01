const configExport = [{
  tableName: 'tasks',
  item: 'Task',
  auth: true,
  attributes: [
    { name: 'title', type: 'String', required: true },
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
      ],
    },
    {
      type: 'delete',
    },
  ],
}];

global.configExport = configExport

module.exports = configExport
