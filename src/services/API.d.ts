declare namespace API {
  export interface CurrentUser {
    userId?:string;
    username?:string;
    role?:string;
    token?:string;
    // avatar?: string;
    // name?: string;
    // title?: string;
    // group?: string;
    // signature?: string;
    // tags?: {
    //   key: string;
    //   label: string;
    // }[];
    // userid?: string;
    // access?: 'user' | 'guest' | 'admin';
    // unreadCount?: number;
  }

  export interface LoginStateType {
    status?: number;
    data?: string;
  }

  export interface NoticeIconData {
    id: string;
    key: string;
    avatar: string;
    title: string;
    datetime: string;
    type: string;
    read?: boolean;
    description: string;
    clickClose?: boolean;
    extra: any;
    status: string;
  }
}
