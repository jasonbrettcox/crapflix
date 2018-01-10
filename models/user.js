User.methods.encrypt = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };