import uuid from 'uuid/v1';
import * as db from './dynamo';

const TableName = 'tasks';

export function getTasks() {
  const params = {
    TableName,
    AttributesToGet: [
      'id',
      'title',
      'type',
      'order',
      'date',
    ],
  };

  return db.scan(params);
}

export function getTaskById(id) {
  const params = {
    TableName,
    Key: {
      id,
    },
  };

  return db.get(params);
}

export function createTask(args) {
  const params = {
    TableName,
    Item: {
      id: uuid(),
      title: args.title,
      type: args.type,
      order: args.order,
      date: args.date,
    },
  };

  return db.createItem(params);
}

export function updateTask(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
    ExpressionAttributeValues: {
      ':title': args.title,
      ':type': args.type,
      ':order': args.order,
      ':date': args.date,
    },
    UpdateExpression: 'SET title = :title, type = :type, order = :order, date = :date',
    ReturnValues: 'ALL_NEW',
  };

  return db.updateItem(params, args);
}

export function deleteTask(args) {
  const params = {
    TableName,
    Key: {
      id: args.id,
    },
  };

  return db.deleteItem(params, args);
}
