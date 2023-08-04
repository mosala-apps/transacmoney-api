import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashInfoType } from '~/interfaces/hash-info.type';
export const displayConflictExceptionMessage = (
  error: any,
  message: string,
) => {
  const {
    driverError: { sqlMessage },
  } = error;
  if (sqlMessage.match('Duplicate')) {
    throw new ConflictException(message);
  }
};

export const hashPasswordWithBcrypt = async (
  password: string,
): Promise<HashInfoType> => {
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);

  return { salt, password: hashPassword } as HashInfoType;
};

export const generateAccountNumber = (): string => {
  // Declare a digits variable
  // which stores all digits
  const digits = '0123456789';
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return `${OTP}-${currentDate()}`;
};

const currentDate = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export interface IUpdateAmountParams{
  agency?: number;
  subAgency?: number
}

export enum EnumActionOnAmount{
  add="add",
  retrieve="retrieve"
}