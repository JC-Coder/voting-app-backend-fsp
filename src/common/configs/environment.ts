import * as dotenv from 'dotenv';
dotenv.config();

interface IEnvironment {
  APP: {
    NAME: string;
    PORT: number | string;
    ADMIN_EMAIL: string;
  };
  GOOGLE: {
    CLIENT_ID: string;
    SECRET: string;
  };
  SMTP: {
    HOST: string;
    USER: string;
    PASSWORD: string;
  };
  JWT: {
    SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXP_TIME: number;
    ACCOUNT_VERIFICATION_SECRET: string;
    ACCOUNT_VERIFICATION_EXP_TIME: number;
  };
  DB: {
    URL: string;
  };
  PAYSTACK: {
    SECRET: string;
  };
}

export const Environment: IEnvironment = {
  APP: {
    NAME: process.env.NAME,
    PORT: process.env.PORT,
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
  },
  GOOGLE: {
    CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    SECRET: process.env.GOOGLE_SECRET,
  },
  SMTP: {
    HOST: process.env.SMTP_HOST,
    USER: process.env.SMTP_USER,
    PASSWORD: process.env.SMTP_PASS,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
    REFRESH_TOKEN_EXP_TIME: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
    ACCOUNT_VERIFICATION_SECRET: process.env.JWT_ACCOUNT_VERIFICATON_SECRET,
    ACCOUNT_VERIFICATION_EXP_TIME:
      +process.env.JWT_ACCOUNT_VERIFICATON_SECRET_EXPIRATION_TIME,
  },
  DB: {
    URL: process.env.DATABASE_URL,
  },
  PAYSTACK: {
    SECRET: process.env.PAYSTACK_SECRET,
  },
};
