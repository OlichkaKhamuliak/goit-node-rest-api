export const globalErrorHandler = (err, _, res, __) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(err.status ?? 500).json({
      message:
        !err.status || err.status === 500
          ? "Internal server error"
          : err.message,
    });
  }

  res.status(err.status ?? 500).json({
    message: err.message,
    stack: err.stack,
  });
};
