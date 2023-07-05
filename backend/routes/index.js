const router = require('express').Router();

const cors = require('cors');
const auth = require('../middlewares/auth');

const signInRouter = require('./signin');
const signUpRouter = require('./signup');
const userRouter = require('./users');
const cardRouter = require('./cards');
const NotFoundErr = require('../errors/notFound');
const { allowedCors } = require('../middlewares/cors');

router.use(cors({
  origin: allowedCors,
  credentials: true,
})); // подключаем CORS

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

router.use('/', signInRouter);
router.use('/', signUpRouter);
router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);
router.use((req, res, next) => next(new NotFoundErr('Страницы по запрошенному URL не существует')));

module.exports = router;
