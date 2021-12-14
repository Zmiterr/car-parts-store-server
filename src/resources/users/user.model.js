class User {
  constructor({ login, role, password }) {
    this.login = login;
    this.role = role;
    this.password = password;
  }

  static toResponse(user) {
    const { id, name, login } = user;
    return { id, name, login };
  }
}

module.exports = User;
