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
