export interface DcmcChainData {
  dataHash: string;
  dataName: string;
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
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
