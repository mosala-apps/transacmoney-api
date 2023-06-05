import { Agency } from '~/modules/agency/entities/agency.entity';
import { SubAgency } from '~/modules/sub-agency/entities/sub-agency.entity';

export interface IUserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
  isActive: boolean;
  access_token: string;
  agency?: Agency;
  subAgency?: SubAgency;
}
