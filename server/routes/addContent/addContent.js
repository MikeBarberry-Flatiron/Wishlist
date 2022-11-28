const { MongoClient, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");

const client = new MongoClient(process.env.MONGO_URI);

exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "access-control-allow-headers":
          "content-type,x-amz-date,authorization,x-api-key,x-amz-security-token,origin,accept",
        "access-control-allow-methods": "options,post,get,put,delete",
        "access-control-allow-origin": "*",
      },
    };
  }

  if (event.httpMethod === "POST") {
    const responseValues = {
      200(updatedContent) {
        return {
          statusCode: 200,
          headers: {
            "access-control-allow-origin": "*",
          },
          body: JSON.stringify({
            message: "Item successfully added.",
            updatedContent,
          }),
        };
      },
      500(err) {
        return {
          statusCode: 500,
          headers: {
            "access-control-allow-origin": "*",
          },
          body: JSON.stringify({
            errorType: "Server",
            error: `Server error occurred during registration: ${err}`,
          }),
        };
      },
    };

    const body = JSON.parse(event.body);
    const token = body.jwt;
    const title = body.title;
    const description = body.description;
    const image = body.image;

    const database = client.db("wishlist");
    const collection = database.collection("usercontent");

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const username = decoded.username;
      const user = await collection.findOne({ username });
      const content = user.content;
      const updatedContent = [...content, { title, description, image }];
      await collection.updateOne(
        { _id: new ObjectId(user._id) },
        { $set: { content: updatedContent } }
      );
      return responseValues[200](updatedContent);
    } catch (err) {
      return responseValues[500](err);
    }
  }
};
