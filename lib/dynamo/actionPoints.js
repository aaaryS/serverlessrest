import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'action_points';

export function getActionPoints() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'description',
      'state',
      'owners',
      'created_at',
      'due_date',
      'sprint',
      'team',
      'actions_taken',
      'archived_at',
    ],
  };

  return db.scan(params);
}

export function getActionPointsByTeam(team) {
  const params = {
    TableName,
    Key: {
      team,
    },
  };

  return db.get(params);
}

export function createActionPoint(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      description: args.description,
      state: args.state,
      owners: args.owners,
      created_at: (new Date()).toLocaleDateString(),
      due_date: args.due_date,
      sprint: args.sprint,
      team: args.team,
      actions_taken: args.actions_taken,
    },
  };

  return db.createItem(params);
}

export function updateActionPoint(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':state': args.state,
      ':actions_taken': args.actions_taken,
      ':archived_at': args.archived_at,
    },
    UpdateExpression: 'SET state = :state, actions_taken = :actions_taken, archived_at = :archived_at',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteActionPoint(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
