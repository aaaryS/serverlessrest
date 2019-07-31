const configExport = [{
  tableName: 'tasks',
  item: 'Task',
  attributes: [
    { name: 'title', type: 'String', required: true },
    { name: 'priority', type: 'Int' },
    { name: 'description', type: 'String', required: true },
    { name: 'tags', type: '[String]' },
    { name: 'created_at', type: 'String' },
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
        { name: 'priority', type: 'Int' },
        { name: 'title', type: 'String!' },
        { name: 'created_at', type: 'String' },
        { name: 'tags', type: '[String]' },
      ],
    },
    {
      type: 'update',
      attributes: [
        { name: 'description', type: 'String' },
        { name: 'title', type: 'String' },
        { name: 'tags', type: '[String]' },
      ],
    },
    {
      type: 'delete',
    },
  ],
}];

global.configExport = configExport

module.exports = configExport
