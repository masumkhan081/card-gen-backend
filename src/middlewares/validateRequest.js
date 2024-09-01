const validateRequest = (requestBodySchema) => async (req, res, next) => {
  try {
    const validatedData = requestBodySchema.safeParse(req.body);
    console.log("validatedData::    " + JSON.stringify(validatedData));
    // res.send(validatedData);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = validateRequest;
