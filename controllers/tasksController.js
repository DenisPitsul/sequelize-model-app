const { Task, User } = require('./../models');

module.exports.getTasks = async (req, res, next) => {
  try {
    const foundTasks = await Task.findAll({
      raw: true,
      include: {
        model: User,
        attributes: ['firstName', 'lastName'],
      },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    res.status(200).send({ data: foundTasks });
  } catch (err) {
    next(err);
  }
};
