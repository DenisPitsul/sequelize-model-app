const createHttpError = require('http-errors');
const _ = require('lodash');
const { User } = require('./../models');

module.exports.createUser = async (req, res, next) => {
  const { body } = req;

  try {
    const createdUser = await User.create(body);

    if (!createdUser) {
      return next(createHttpError(400, 'Something went wrong'));
    }

    // const preparedUser = { ...createdUser.get() };
    // delete preparedUser.passwHash;
    // delete preparedUser.createdAt;
    // delete preparedUser.updatedAt;

    const preparedUser = _.omit(createdUser.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.getUsers = async (req, res, next) => {
  const { limit, offset } = req.pagination;

  try {
    const foundUsers = await User.findAll({
      raw: true,
      attributes: {
        exclude: ['passwHash', 'createdAt', 'updatedAt'],
      },
      limit,
      offset,
      order: ['id'],
    });
    res.status(200).send({ data: foundUsers });
  } catch (err) {
    next(err);
  }
};

module.exports.getUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const foundUser = await User.findByPk(id, {
      raw: true,
      attributes: { exclude: ['passwHash', 'createdAt', 'updatedAt'] },
    });

    if (!foundUser) {
      return next(createHttpError(404, 'User Not Found'));
    }

    res.status(200).send({ data: foundUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateUserById = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      raw: true,
      where: { id },
      returning: true,
    });

    if (!updatedUsersCount) {
      return next(createHttpError(404, 'User Not Found'));
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.updateOrCreateUser = async (req, res, next) => {
  const {
    body,
    params: { id },
  } = req;

  try {
    const [updatedUsersCount, [updatedUser]] = await User.update(body, {
      raw: true,
      where: { id },
      returning: true,
    });

    if (!updatedUsersCount) {
      // create
      body.id = id;
      return next();
    }

    const preparedUser = _.omit(updatedUser, [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);
    res.status(200).send({ data: preparedUser });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteUserById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedUserCount = await User.destroy({ where: { id } });
    if (!deletedUserCount) {
      return next(createHttpError(404, 'User Not Found'));
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
