export interface debugLogColoumn{
  id : number,
  userId : number,
  username : String,
  ip : String,
  optAt : String,
  callMethodName : String,
  callDuration : number,
  optResult : number,
  queryTimeRange: number[]
}

/*
  public class DebugLogVo {
    private long id;
    private long userId; // 用户id
    private String username; // 用户名称即操作人
    private String ip; // 访问ip
    private String callMethodName; // 调用方法名称
    private long callDuration; // 操作过程花费的时间，调试日志使用，单位为ms
    private int optResult; // 操作结果，成功或失败
    private String optAt; // 操作时间
}
*/

export interface TableListParam{
  id ? : number,
  userId? : number,
  username? : String,
  ip? : String,
  optAt? : String,
  callMethodName? : String,
  callDuration? : number,
  optResult? : number,
  startTime: String,
  endTime: String,
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any[] };
  sorter?: { [key: string]: any };
}
