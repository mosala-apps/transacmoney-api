import { Agency } from '~/modules/agency/entities/agency.entity';
import { SubAgency } from '~/modules/sub-agency/entities/sub-agency.entity';

export interface IUserResponse {
  user: IUser;
  access_token: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  agency?: Agency;
  subAgency?: SubAgency;
}
