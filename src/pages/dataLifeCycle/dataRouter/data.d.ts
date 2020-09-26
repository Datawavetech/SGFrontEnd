export interface DataRouter {
  dataIdentifier: string;
  levelOneSys: SysInfo;
  levelTwoSys: SysInfo;
  levelThreeSys: SysInfo;
}

export interface SysInfo {
  sysName: string;
  dataHash: string;
  createAt: string;
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
  dataIdentifier?: string;
  levelOneSysName?: string;
  levelTwoSysName?: string;
  levelThreeSysName?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
