export interface IResponseMessage {
  success: boolean;
  data?: any;
  message?: string;
}

export class ResponseMessage implements IResponseMessage {
  public success: boolean;
  public data?: any;
  public message?: string;

  constructor(success: boolean, data?: any, message?: string) {
    // removes password
    if (data?.password) {
      delete data['_doc']['password'];
    }

    // removes refresh token
    if (data?.hashedRefreshToken) {
      delete data['_doc']['hashedRefreshToken'];
    }

    this.success = success;
    this.data = data ? data : null;
    this.message = message ? message : null;
  }
}
