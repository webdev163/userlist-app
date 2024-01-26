import { User } from './models';

export interface ApiResponse {
  info: {
    page: number;
    results: number;
    seed: string;
    version: string;
  };
  results: User[];
}
