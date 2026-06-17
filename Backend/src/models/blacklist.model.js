const mongoose = require("mongoose");

const blacklistTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const BlacklistTokenModel = mongoose.model(
  "BlacklistToken",
  blacklistTokenSchema,
);

module.exports = BlacklistTokenModel;
