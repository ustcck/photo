import { IUser } from '@/shared/model/user.model';

export interface IPhoto {
  id?: number;
  name?: string;
  date?: Date;
  description?: string;
  imageContentType?: string;
  image?: any;
  user?: IUser;
}

export class Photo implements IPhoto {
  constructor(
    public id?: number,
    public name?: string,
    public date?: Date,
    public description?: string,
    public imageContentType?: string,
    public image?: any,
    public user?: IUser
  ) {}
}
