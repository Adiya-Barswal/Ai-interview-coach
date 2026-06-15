const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: [true, "Token is required"],
    },
  },
  {
    timestamps: true,
  },
);

const BlacklistTokenModel = mongoose.model(
  "BlacklistTokens",
  blacklistTokenSchema,
);

module.exports = BlacklistTokenModel;
