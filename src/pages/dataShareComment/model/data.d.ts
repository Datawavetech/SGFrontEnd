export interface TokenModel {
  modelId: string;
  modelName: string;
  modelDesc: string;
  upCount: number;
  createAt: Date;
  isRunning: string;
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
  modelId?: string;
  modelName?: string;
  modelDesc?: string;
  upCount?: number;
  isRunning?: number;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
