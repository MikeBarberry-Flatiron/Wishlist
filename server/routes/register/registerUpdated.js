const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const client = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event, context, callback) => {
  const username = event.username.toLowerCase();
  const { password } = event;

  const response = await register();
  return callback(null, response);

  async function register() {
    if (!username || username.length < 2 || !password || password.length < 8) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors:
            "Username must be at least two characters and password at least 8.",
        }),
      };
    }

    const usercontent = client.db("wishlist").collection("usercontent");
    const isUsernameTaken = await usercontent.findOne({ username });
    if (isUsernameTaken) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: "Username is already taken." }),
      };
    }

    const hash = await bcrypt.hash(password, 10);
    if (!hash) {
      return {
        statusCode: 500,
        body: JSON.stringify({ errors: "Internal server error." }),
      };
    }

    const newUser = await usercontent.insertOne({
      username,
      hash,
      content: [],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "User successfully registered.",
        newUser,
      }),
    };
  }
};
