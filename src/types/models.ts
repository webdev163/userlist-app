export interface User {
  id: string;
  isCustom: boolean;
  gender: string;
  email: string;
  name: {
    first: string;
    last: string;
    title?: string;
  };
}
