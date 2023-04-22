import { InternalServerErrorException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import * as fs from 'fs';

export const helperFunction = {
  hashData: (data: string) => {
    return bcrypt.hash(data, 10);
  },

  compareHashedData: (data: string, hashedData: string) => {
    return bcrypt.compare(data, hashedData);
  },

  generateRandomString: (length: number) => {
    return crypto.randomBytes(length).toString('hex');
  },

  deleteFileFromUploadFoler: async (name: string) => {
    try {
      await fs.unlink(`./uploads/${name}`, (err) => {
        if (err) throw err;
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  },

  generateRandomNumber(length: number) {
    return Math.random().toString().substr(2, length);
  },

  isValidImage(filename: string) {
    var regex = /\.(jpg|jpeg|png|gif|svg)$/i;
    return regex.test(filename);
  },
};
