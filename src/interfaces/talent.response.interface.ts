import { IUserResponse } from './user.response.interface';

export interface ITalentResponse extends IUserResponse {
  talentId: number;
  firstName?: string;
  lastName: string;
  name: string;
  experience: string;
  level: string;
  education?: string;
  githubLink?: string;
  websiteLink?: string;
  location?: string;
  phone?: string;
}
