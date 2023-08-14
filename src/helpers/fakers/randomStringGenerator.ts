import * as randomstring from "randomstring";

export class Fakers {
  generateRandomString(): string {
    return randomstring.generate({
      length: 10,
      charset: "alphabetic",
    });
  }
}
