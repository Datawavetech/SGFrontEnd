
# SGFrontEnd

## 前端界面路由

- 数据确权 /dataConfirm
	- 权属标识 /assetIdentifier
		- 操作
			- 1.查询 - 都可用
			- 2.更新 - 仅管理员可用
			- 3.删除 - 仅管理员可用
			- 4.创建 - 仅管理员可用
		- 结构
			- 1.资源唯一标识符 - 哈希值
			- 2.资源名称 - objName，如T_YJ_GZQX_QXHZ
			- 3.所属者 - 系统，如PMS系统
			- 4.积分 - 默认1分，每共享一次多加1分
			- 5.*查看证明 - 签名数据（对资源唯一标识符的签名）
			- 6.时间 - 倒序
		- 包含界面
			- 1.查询界面
			- 2.创建/更新界面 - 表单（资源名称、资源来源系统）
	- 权属证明 /assetProof
		- 证明验证 - 输入数据哈希、证明信息
	- 使用约定 /dataUsage
		- 增删改查(列表，字符串)
- 数据上链 /dataOnChain
	- 上链申请查看 /onChainRequests - 普通用户查看自己的上链申请
		- 创建按钮
			- 表单 - 传文件、设置共享过期时间、设置数据使用约定（列表）
	- 上链审批 /onChainApprove - 仅管理员可见
- 数据共享评价管理 /dataShareComment
	- 模型管理 /model - 两个列表（正在跑的、已创建的）
		- 创建按钮
			- 表单 - （上升指数）
	- 积分管理 /token - 包含用户积分、部门积分、系统积分、积分评价
- 数据共享全生命周期管理 /dataLifeCycle
	- 数据全链路 /duringChain - 含溯源查询按钮，输入查询数据名称
		- 生命周期管理 - 数据在不同系统流转
		- 全链路信息
	- 统计分析 /analysis
		- 用户权属认证数据积分统计
		- 用户的数据权属认证频率统计
		- 用户的使用权申请统计
- 区块链管理 /chainMng
	- 密钥管理 /keyMng - 列表
	- 区块链运行信息 /explorer - 参考飞洛链


## 目录结构

我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.ts            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```
