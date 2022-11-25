const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
// local uses dotenv

const client = new MongoClient(process.env.MONGO_URI);

async function register(username, password) {
  try {
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
  } catch (error) {
    console.error(`Error occurred during registration: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        errors: "An error occurred during registration.",
      }),
    };
  } // local needs finally with client.close(). Lambda does not
}

exports.handler = async ({ username, password }) => {
  async function validateInputAndProceedIfOk() {
    if (!username || username.length < 2 || !password || password.length < 8) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          errors:
            "Username must be at least two characters and password at least 8.",
        }),
      };
    }
    return register(username.toLowerCase(), password);
  }
  return validateInputAndProceedIfOk();
};
