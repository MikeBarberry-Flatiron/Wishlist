const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const client = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'access-control-allow-headers':
          'content-type,x-amz-date,authorization,x-api-key,x-amz-security-token,origin,accept',
        'access-control-allow-methods': 'options,post,get,put,delete',
        'access-control-allow-origin': '*',
      },
    };
  }

  if (event.httpMethod === 'POST') {
    const returnValues = {
      200 (token) {
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: 'Logged in.',
            error: null,
            jwt: token
          }),
          headers: {
            'access-control-allow-origin': '*',
          },
        }
      },
      400 (message) {
        return {
          statusCode: 400,
          body: JSON.stringify({
          message: null,
          error: message,
        }),
        headers: {
          'access-control-allow-origin': '*',
        },
        }
      },
      500: {
        statusCode: 500,
        body: JSON.stringify({
          message: null,
          error: 'A server error occurred during login.',
        }),
        headers: {
          'access-control-allow-origin': '*',
        },
      }
    }
    try {
      const body = JSON.parse(event.body)
      const username = body.username.toLowerCase()
      const { password } = body
      const database = client.db('wishlist');
      const collection = database.collection('usercontent');

      const user = await collection.findOne({ username })
      if (!user) {
        return returnValues[400]('User does not exist.')
      }
      const isPasswordCorrect = await bcrypt.compare(password, user.hash)
      if (!isPasswordCorrect) {
        return returnValues[400]('Password is incorrect.')
      }
      const token = jwt.sign({ user }, 'w!$HL!$T3')
      return returnValues[200](token)
    } catch (err) {
      console.log(`Error: ${err}`)
      return returnValues[500]
    }
  }
};

