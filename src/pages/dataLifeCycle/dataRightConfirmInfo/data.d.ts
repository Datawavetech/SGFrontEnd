export interface DataRightConfirmInfoData {
  dataHash: string;
  dataName: string;
  sysName: string;
  proof: string;
  authorizedUsers: Set;
  authorizedAt: Date;
  count: number;
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
  dataHash?: string;
  dataName?: string;
  sysName?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
