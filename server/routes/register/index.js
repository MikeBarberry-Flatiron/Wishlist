const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

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
      200(result) {
        return {
          statusCode: 200,
          headers: {
            'access-control-allow-origin': '*',
          },
          body: JSON.stringify({
            message: `User successfully registered with _id: ${result.insertedId}`,
            error: null,
          }),
        };
      },
      400: {
        statusCode: 400,
        headers: {
          'access-control-allow-origin': '*',
        },
        body: JSON.stringify({
          errorType: 'User',
          error: 'User is already registered.',
        }),
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
    const getSeedContent = () => [
      {
        title: 'Xenia',
        image:
          'https://cdn.shoplightspeed.com/shops/609770/files/11435268/600x600x2/pulsing-xenia-frag-1-2.jpg',
        description: 'some strains will pulse in low flow conditions',
      },
      {
        title: 'Candy Cane',
        image:
          'https://www.reef2reef.com/ams/beginner-coral-candy-cane-trumpet.260/cover-image',
        description: 'one of the more popular lps corals',
      },
      {
        title: 'Zoa',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.MrKksf9_em_dAu_9l-7mNgHaEJ%26pid%3DApi&f=1',
        description: 'a good beginner soft coral option',
      },
      {
        title: 'Chalice',
        image:
          'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.jbOxoMlqXC6Idc0jFyJR9QHaHn%26pid%3DApi&f=1',
        description:
          "loved because of it's bright green color; grows really fast",
      },
      {
        title: 'Finger leather',
        image: 'https://c1.staticflickr.com/5/4037/4347301073_41a681a1a2_b.jpg',
        description: 'this coral often grows large and has a unique shape',
      },
      {
        title: 'SPS',
        description: 'sps coral stands for small polyp stony',
        image:
          'https://cdn.shopify.com/s/files/1/2104/4149/products/acr-H6H4-2_1024x1024_2x_502d3e07-c606-484f-b83d-7887e48a98f1_410x.jpg?v=1500776485',
      },
      {
        title: 'Frogspawn',
        description: 'called frogspawn due to the green color',
        image:
          'https://theaquariumguide.com/wp-content/uploads/2018/07/Frogspawn-Coral.jpg',
      },
      {
        title: 'Hammerhead',
        description: 'aptly named',
        image:
          'https://cdn.fishtankadvisor.com/wp-content/uploads/2021/11/euphylliidae-ancora.jpg',
      },
      {
        title: 'Anemone',
        description: 'clownfish like to host in them',
        image:
          'https://coral.org/wp-content/uploads/2021/09/SoftCorals_Bali-scaled.jpg',
      },
    ];

    const requestBody = JSON.parse(event.body);
    const username = requestBody.username.toLowerCase();
    const { password } = requestBody;
    const database = client.db('wishlist');
    const collection = database.collection('usercontent');

    try {
      const user = await collection.findOne({ username });
      if (user) {
        return responseValues[400];
      }
      const hash = await bcrypt.hash(password, 10);
      const seedContent = getSeedContent();
      const newUser = {
        username,
        password: hash,
        content: seedContent,
      };
      const result = await collection.insertOne(newUser);
      return responseValues[200](result);
    } catch (err) {
      console.log(`A server error occurred: ${err}`);
      return responseValues[500](err);
    }
  }
};
