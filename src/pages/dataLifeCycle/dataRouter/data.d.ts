export interface DataRouter {
  dataIdentifier:string;
  levelOneSysName:string;
  levelOneSysDataHash:string;
  levelOneSysCreateAt:string;
  levelTwoSysName:string;
  levelTwoSysDataHash:string;
  levelTwoSysCreateAt:string;
  levelThreeSysName:string;
  levelThreeSysDataHash:string;
  levelThreeSysCreateAt:string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  levelOneSysName?:string;
  levelTwoSysName?:string;
  levelThreeSysName?:string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
