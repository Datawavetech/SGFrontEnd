export interface errorLogColoumn{
  id : number,
  userId : number,
  username : String,
  ip : String,
  callMethodName : String,
  exceptionDesc : String,
  optAt : String,
  queryTimeRange: number[]
}

/*
public class ErrorLogVo {
    private long id;
    private long userId; // 用户id
    private String username; // 用户名称即操作人
    private String ip; // 访问ip
    private String callMethodName; // 调用方法名称
    private String exceptionDesc; // 异常描述
    private String optAt; // 操作时间
}
*/

export interface TableListParam{
  id? : number,
  userId? : number,
  username? : String,
  ip? : String,
  callMethodName? : String,
  exceptionDesc? : String,
  optAt? : String,
  startTime: String,
  endTime: String,
  pageSize?: number,
  currentPage?: number,
  filter?: { [key: string]: any[] },
  sorter?: { [key: string]: any },
}
