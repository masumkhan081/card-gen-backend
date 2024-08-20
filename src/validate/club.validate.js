const { z } = require("zod");

const clubSchema = z.object({
  name: z.string().min(1).max(50), //
  photo: z.string().min(1).max(50),
});

//
module.exports = clubSchema;
