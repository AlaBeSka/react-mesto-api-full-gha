const errorHandler = (err, _, res, next) => {
  const statusCode = err.statusCode || 500;

  let message = '';
  if (statusCode === 500) {
    message = 'На сервере произошла ошибка';
  } else if (statusCode === 401) {
    message = 'Неправильные почта или пароль';
  } else {
    message = err.message;
  }

  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
