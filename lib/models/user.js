export class User {
  greeting() {
    return `Bienvenido ${this.firstName}`;
  }

  get isLogged() {
    return Boolean(this.username);
  }

  static fromJson(userData) {
    return Object.assign(new User(), userData);
  }
}
