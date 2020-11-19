export interface runningLogColoumn{
  id : number,
  userId : number,
  username : String,
  ip : String,
  optAt : String,
  auditType : number,
  optContent : String,
  optResult : number,
  queryTimeRange: number[]
}


export interface TableListParam{
  id? : number,
  userId? : number,
  username? : String,
  ip? : String,
  optAt? : number,
  auditType? : number,
  optContent? : String,
  optResult? : number,
  startTime?: String,
  endTime?: String,
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
