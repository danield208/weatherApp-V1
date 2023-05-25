export class UserdataModel {
  email: string;
  name: string;
  savedcities: any;

  constructor(obj?: any) {
    this.email = obj && obj.email ? obj.email : "";
    this.name = obj && obj.name ? obj.name : "";
    this.savedcities = obj && obj.savedcities ? obj.savedcities : [];
  }

  toJson() {
    return {
      email: this.email,
      name: this.name,
      savedcities: this.savedcities,
    };
  }
}
