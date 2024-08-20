const { z } = require("zod");

 
const countrySchema = z.object({
  name: z.string().min(1).max(50), //
  photo: z.string().min(1).max(50), //
});

//
module.exports = countrySchema;
