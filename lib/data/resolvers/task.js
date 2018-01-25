import * as dbTasks from '../../dynamo/tasks';

export default {
  Query: {
    tasks: () => dbTasks.getTasks(),
    task: (_, args) => dbTasks.getTaskById(args.id),
  },
  Mutation: {
    createTask: (_, args) => dbTasks.createTask(args),
    updateTask: (_, args) => dbTasks.updateTask(args),
    deleteTask: (_, args) => dbTasks.deleteTask(args),
  },
};
