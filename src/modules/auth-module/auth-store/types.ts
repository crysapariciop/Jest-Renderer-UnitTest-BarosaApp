export interface Metadata {
  host: string;
  password: string;
  username: string;
  database: string;
  port: string;
  _id: string;
}
export interface IUserDataSourcesAtom {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  token: string;
  userId: string;
}
export interface ISignUpDataSource {
  email: string;
  firstName: string;
  lastName: string;
  userType: string;
  providerId: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
  success: boolean;
}
export interface ISignUpDataSourcesAtom {
  isLoaded: boolean;
  error: boolean;
  loaded?: boolean;
  data: any;
}
