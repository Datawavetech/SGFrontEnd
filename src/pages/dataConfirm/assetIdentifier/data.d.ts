export interface AssetIdentifier {
  dataHash: string;
  assetName: string;
  assetSys: string;
  token: number;
  createdAt: Date;
  updatedAt: Date;
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
  dataHash?: string;
  assetName?: string;
  assetSys?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
