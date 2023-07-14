const mongoose = require('mongoose');

const cfg = require('../cfg');

const cardSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Имя карточки обязательно для заполнения'],
      minlength: [2, 'Имя карточки должно быть длиной от 2 символов'],
      maxlength: [30, 'Имя карточки должно быть длиной до 30 символов'],
    },
    link: {
      type: String,
      validate: {
        validator: (url) => cfg.URL_REGEX.test(url),
        message: [true, 'URL обязателен для заполнения'],
      },
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      required: true,
    },
    likes: [{
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'user',
      default: [],
    }],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('card', cardSchema);
