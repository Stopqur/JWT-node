module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("persons", {
    username: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    dob: {
      type: Sequelize.STRING
    }
  });
  return User;
};
