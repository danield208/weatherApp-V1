export class UserdataModel {
  email: string;
  name: string;
  savedcities: Array<string>;

  constructor(obj?: any) {
    this.email = obj ? obj.email : "";
    this.name = obj ? obj.name : "";
    this.savedcities = obj ? obj.savedcities : [];
  }

  toJson() {
    return {
      email: this.email,
      name: this.name,
      savedcities: this.savedcities,
    };
  }
}
