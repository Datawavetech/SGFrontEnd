import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Typography /* Alert */ } from 'antd';
// import styles from './Welcome.less';

// const CodePreview: React.FC<{}> = ({ children }) => (
//   <pre className={styles.pre}>
//     <code>
//       <Typography.Text copyable>{children}</Typography.Text>
//     </code>
//   </pre>
// );

export default (): React.ReactNode => (
  <PageContainer>
    <Card>
      {/* <Alert */}
      {/*  message="umi ui 现已发布，点击右下角 umi 图标即可使用" */}
      {/*  type="success" */}
      {/*  showIcon */}
      {/*  banner */}
      {/*  style={{ */}
      {/*    margin: -12, */}
      {/*    marginBottom: 24, */}
      {/*  }} */}
      {/* /> */}
      <Typography.Text strong>
        <a target="_blank" rel="noopener noreferrer" href="https://pro.ant.design/docs/block">
          开发中敬请期待...
        </a>
      </Typography.Text>
      {/* <CodePreview> npm run ui</CodePreview> */}
      {/* <Typography.Text */}
      {/*  strong */}
      {/*  style={{ */}
      {/*    marginBottom: 12, */}
      {/*  }} */}
      {/* > */}
      {/*  <a */}
      {/*    target="_blank" */}
      {/*    rel="noopener noreferrer" */}
      {/*    href="https://pro.ant.design/docs/available-script#npm-run-fetchblocks" */}
      {/*  > */}
      {/*    获取全部区块 */}
      {/*  </a> */}
      {/* </Typography.Text> */}
      {/* <CodePreview> npm run fetch:blocks</CodePreview> */}
    </Card>
    <p
      style={{
        textAlign: 'center',
        marginTop: 24,
      }}
    >
      Want to add more pages? Please refer to{' '}
      <a href="https://pro.ant.design/docs/block-cn" target="_blank" rel="noopener noreferrer">
        use block
      </a>
      。
    </p>
  </PageContainer>
);
