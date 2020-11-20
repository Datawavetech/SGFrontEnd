import { RcFile } from "antd/lib/upload";

export interface OnChainRequest {
  requestId: number;
  userId: string;
  dataHash: string;
  dataPath: string;
  dataName: string;
  usages: string;
  dataTypes: string;
  expireAt: Date;
  status: number;
  file: Object;
}

export interface OnChainRequestForm {
  usages?: string[];
  dataTypes?: string[];
  expireAt?: Moment;
  file?: { file: { originFileObj: RcFile }, fileList: RcFile[] };
}

export interface DownloadLogParams {
  type?: number;
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
  dataHash?: string;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
