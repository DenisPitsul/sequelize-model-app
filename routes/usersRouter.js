const { Router } = require('express');
const { usersController } = require('./../controllers');
const { paginate } = require('../middleware');

const usersRouter = Router();

usersRouter
  .route('/')
  .get(paginate.paginateUsers, usersController.getUsers)
  .post(usersController.createUser);

usersRouter
  .route('/:id')
  .get(usersController.getUserById)
  .patch(usersController.updateUserById)
  .put(usersController.updateOrCreateUser, usersController.createUser)
  .delete(usersController.deleteUserById);

usersRouter.route('/:id/tasks').get(usersController.getUserTasks);

module.exports = usersRouter;
