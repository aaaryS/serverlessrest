import bcrypt from 'bcryptjs';
import uuid from 'uuid/v1';
import jsonwebtoken from 'jsonwebtoken';
import * as db from './../../dynamo/dynamo';
import { configWithAuth } from './../../utils/helpers'

const generateAuthResolvers = config => (configWithAuth(config) ? {
  Mutation: {
    login: async (_, { email, password }) => {
      const users = await db.scan({
        TableName: 'users',
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email }
      })

      if (users.length === 0) {
        throw new Error('No user with that email')
      }

      const user = users[0]

      const valid = bcrypt.compareSync(password, user.password)

      if (!valid) {
        throw new Error('Incorrect password')
      }

      // return json web token
      return jsonwebtoken.sign(
        { id: user.id, email: user.email },
        'SOME_REALLY_SECRET',
        { expiresIn: '1d' }
      )
    },
    signup: async (_, { username, email, password }) => {
      const users = await db.scan({
        TableName: 'users',
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: { ':email': email }
      })

      const cryptedPassword = bcrypt.hashSync(password, 10);

      if (users.length > 0) {
        throw new Error('User already exsist!')
      } else {
        const newUser = await db.createItem({ TableName: 'users', Item: { id: uuid(), created_at: (new Date()).toLocaleDateString(), username, email, password: cryptedPassword } })

        return jsonwebtoken.sign(
          { id: newUser.id, email: newUser.email },
          'SOME_REALLY_SECRET',
          { expiresIn: '1y' }
        )
      }
    }
  }
} : {})

export default generateAuthResolvers;
