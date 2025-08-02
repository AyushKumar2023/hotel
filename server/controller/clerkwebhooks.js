const User = require("../model/user.js");
const { Webhook } = require("svix");

const clerkWebHooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Getting headers
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };
    // Verify
    await whook.verify(JSON.stringify(req.body), headers);
    // Getting Data From Request Body:
    const { data, type } = req.body;

    const userData = {
      _id: data.id,
      username: data.first_name + " " + data.last_name,
      email: data.email_addresses[0].email_address,
      image: data.image_url,
    };
    // Switch  case for different events
    switch (type) {
      case "user.created": {
        await User.create(userData);
        break;
      }
      case "user.updated": {
        await User.findByIdAndUpdate(data.id, userData);
        break;
      }
      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        break;
      }

      default:
        break;
    }
    res.json({ success: true, message: "webhook Received" });
  } catch (e) {
    console.log(e.message);
    res.json({
      success: false,
      message: e.message,
    });
  }
};
module.exports = { clerkWebHooks };
