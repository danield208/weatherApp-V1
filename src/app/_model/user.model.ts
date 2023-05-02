export class data {
  test: string;

  constructor(obj?: any) {
    this.test = obj ? obj.test : "";
  }
}
