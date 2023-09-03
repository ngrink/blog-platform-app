export class AccessPayloadDto {
    accountId;
    username;
    email;

    constructor(account) {
      this.accountId = account._id;
      this.username = account.username;
      this.email = account.email;
    }
}
