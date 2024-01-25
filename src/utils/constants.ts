export const BASE_URL =
  'https://randomuser.me/api/?nat=ua&results=50&exc=location,login,registered,dob,phone,id,cell,picture,nat';

export const ANIMATION_TIME = 300;

export const START_DELAY = 700;

export enum LocalStorageKeys {
  SEED = 'seed',
  USERS = 'users',
}

export enum RouterPaths {
  LOGIN = '/',
  USERS = '/users',
}

export enum FormInputNames {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  EMAIL = 'email',
  GENDER = 'gender',
}

export enum RadioInputValues {
  MALE = 'male',
  FEMALE = 'female',
}
