export class AccountDto {
    accountId;
    username;
    email;

    constructor(account) {
      this.accountId = account._id;
      this.username = account.username;
      this.email = account.email;
    }
}
