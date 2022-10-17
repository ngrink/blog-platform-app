export class AccessPayloadDto {
    accountId;
    roles;
    isActivated;

    constructor(account) {
      this.accountId = account._id;
      this.username = account.username;
      this.email = account.email;
    }
}
