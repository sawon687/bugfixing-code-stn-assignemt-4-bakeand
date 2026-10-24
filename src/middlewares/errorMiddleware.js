const errorHandler = (err, req, res, next) => {
  console.error(err);

  const status = err.name === "ZodError" ? 400 : err.statusCode || 500;

  const response = {
    success: false,
    message:
      process.env.NODE_ENV === "production" && status === 500
        ? "Internal server error"
        : err.message || "Server error",
  };

  if (err.name === "ZodError") {
    response.errors = err.issues.map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));

    response.message = err.issues[0]?.message || "Validation failed";
  }

  if (process.env.NODE_ENV === "development") {
    response.stack = err.stack;
  }

  return res.status(status).json(response);
};

module.exports = errorHandler;
