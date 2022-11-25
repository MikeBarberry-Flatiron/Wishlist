const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// local uses dotenv

const client = new MongoClient(process.env.MONGO_URI);

async function login(username, password) {
  try {
    const usercontent = client.db("wishlist").collection("usercontent");
    const user = await usercontent.findOne({
      username: username.toLowerCase(),
    });
    if (!user) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: "User not found." }),
      };
    }
    const isValidPassword = await bcrypt.compare(password, user.hash);
    if (!isValidPassword) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: "Wrong password." }),
      };
    }
    const token = await jwt.sign(
      { user_name: username },
      process.env.JWT_SECRET
    );
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Logged in.",
        jwt: token,
      }),
    };
  } catch (error) {
    console.error(`Error occurred during login: ${error}`);
    return {
      statusCode: 400,
      body: JSON.stringify({
        errors: "An error occurred during login.",
      }),
    };
  } // local needs finally with client.close(). Lambda does not
}

exports.handler = async ({ username, password }) => {
  async function validateInputAndProceedIfOk() {
    if (!username || username.length < 2 || !password || password.length < 8) {
      return {
        statusCode: 400,
        body: JSON.stringify({ errors: "Invalid username or password." }),
      };
    }
    return login(username, password);
  }
  return validateInputAndProceedIfOk();
};
