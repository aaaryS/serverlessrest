import * as dbTasks from '../../dynamo/actionPoints';

export default {
  Query: {
    actionPoints: () => dbTasks.getActionPoints(),
    actionPointsByTeam: (_, args) => dbTasks.getActionPointsByTeam(args.team),
  },
  Mutation: {
    createActionPoint: (_, args) => dbTasks.createActionPoint(args),
    updateActionPoint: (_, args) => dbTasks.updateActionPoint(args),
    deleteActionPoint: (_, args) => dbTasks.deleteActionPoint(args),
  },
};
