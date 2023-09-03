export class RefreshPayloadDto {
    accountId;

    constructor(account) {
      this.accountId = account._id;
    }
}
