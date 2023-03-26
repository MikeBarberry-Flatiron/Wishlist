const { MongoClient } = require('mongodb');
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
    const responseValues = {
      200(content) {
        return {
          statusCode: 200,
          headers: {
            'access-control-allow-origin': '*',
          },
          body: JSON.stringify({
            content,
          }),
        };
      },
      500(err) {
        return {
          statusCode: 500,
          headers: {
            'access-control-allow-origin': '*',
          },
          body: JSON.stringify({
            errorType: 'Server',
            error: `Server error occurred during registration: ${err}`,
          }),
        };
      },
    };

    const body = JSON.parse(event.body);
    const token = body.jwt;
    const database = client.db('wishlist');
    const collection = database.collection('usercontent');

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;
      const user = await collection.findOne({ username });
      return responseValues[200](user.content);
    } catch (err) {
      console.log(`A server error occurred: ${err}`);
      return responseValues[500](err);
    }
  }
};
