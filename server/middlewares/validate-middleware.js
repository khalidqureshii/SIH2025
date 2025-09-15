const validateSignup = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    console.log(parseBody);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = 404;
    const message = "Fill the input properly";
    const extraDetails = err.errors[0].message;
    const errorDetails = {
      message,
      status,
      extraDetails,
    };
    console.log(err);
    next(errorDetails);
  }
};

export default validateSignup;
