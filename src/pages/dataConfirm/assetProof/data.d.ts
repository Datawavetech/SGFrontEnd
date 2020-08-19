export interface AssetProof {
  dataHash: string;
  assetName: string;
  assetSys: string;
  proof: string;
  createAt: Date;
  updateAt: Date;
  verifyRes: number;
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
  status?: string;
  dataHash?: string;
  assetName?: string;
  assetSys?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
