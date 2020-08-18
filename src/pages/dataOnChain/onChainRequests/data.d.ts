export interface OnChainRequest {
  requestId: string;
  userId: string;
  dataHash: string;
  dataPath: string;
  dataName: string;
  usages: string;
  dataTypes: string;
  expireAt: Date;
  status: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: AssetIdentifier[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  status?: string;
  assetName?: string;
  // desc?: string;
  dataHash?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
