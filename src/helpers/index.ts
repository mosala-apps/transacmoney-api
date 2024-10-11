import { ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { HashInfoType } from '~/interfaces/hash-info.type';
import { Transactions } from '~/modules/transaction/entities/transaction.entity';
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
  const groups = 4;
  const digitsPerGroup = 4;

  let accountNumber = '';

  for (let i = 0; i < groups; i++) {
    const group = String(
      Math.floor(Math.random() * Math.pow(10, digitsPerGroup)),
    ).padStart(digitsPerGroup, '0');
    accountNumber += group;

    if (i < groups - 1) {
      accountNumber += ' '; // Ajouter un espace entre les groupes
    }
  }

  return accountNumber;
};

const currentDate = (): string => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export interface IUpdateAmountParams {
  agency?: number;
  subAgency?: number;
}

export enum EnumActionOnAmount {
  add = 'add',
  retrieve = 'retrieve',
}

export interface StatsData {
  transaction: Transactions;
  comission: number;
}
