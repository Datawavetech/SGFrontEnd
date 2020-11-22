import { DownloadFileParams, DownloadLogParams } from '@/pages/dataOnChain/onChainRequests/data';
import { downloadFile } from '@/pages/dataOnChain/onChainRequests/service';
import { downloadLog } from '@/services/logService';
import { message } from 'antd';
import { parse } from 'querystring';

const NodeRSA = require('node-rsa');

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

export const b64toBlob = (b64Data: string, contentType: string = '', sliceSize: number = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

export const handleDownload = async (fields: DownloadFileParams) => {
  const hide = message.loading('正在下载...');
  try {
    const ret = await downloadFile({ ...fields });
    hide();
    if (ret && ret.data) {
      const fileBytesB64 = ret.data.fileBytesB64;
      const filename = ret.data.filename;
      const contentType = ret.data.contentType;
      const blob = b64toBlob(fileBytesB64, contentType);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      message.success('下载启动成功');
    } else {
      message.warn('下载失败');
    }
    return true;
  } catch (error) {
    hide();
    message.error('下载失败');
    return false;
  }
}

export const handleLogDownload = async (fields: DownloadLogParams) => {
  const hide = message.loading('正在下载...');
  try {
    const ret = await downloadLog({ ...fields });
    hide();
    if (ret && ret.data) {
      const fileBytesB64 = ret.data.fileBytesB64;
      const filename = ret.data.filename;
      const contentType = ret.data.contentType;
      const blob = b64toBlob(fileBytesB64, contentType);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      message.success('下载启动成功');
    } else {
      message.warn('下载失败');
    }
    return true;
  } catch (error) {
    hide();
    message.error('下载失败');
    return false;
  }
}
// pk: string, msg: string
export const encrypt = (data: string) => {
  const key = new NodeRSA();
  const keyData = `-----BEGIN PUBLIC KEY-----
  MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhX8B/Q+PA6qx4zZlqyvT
  P460faqWBLsdxU4MbmpuWqhLooDfcvIS8YMgQGnsHktTuzqIkVl26aQkMP352MUt
  Ivo493rbkyA50zAoTrsLGZBZxrmLUUTEHNukUZ3C3l1oKJsxv2eEc7Z+3M443jKb
  MfdRyrHnLe8KTaEzLMylzRdm7s6C8kMsNoMtxSutLjyaZmgaYVBF2VrawkG4BK0w
  XqtWDYehSjk3Dlje4de0pbvnIL7CQFH/KBijlqRihkLKnhOViU1tNssHx8kCDvJu
  RzRKXViII35h+Ogyz9mxzQED5uBB/jxY9foSLf3vD3QGbqy/40ErywzPsnuESmWd
  hwIDAQAB
  -----END PUBLIC KEY-----
  `;
  key.importKey(keyData, 'pkcs8-public');
  const encrypted = key.encrypt(data, 'base64');
  return encrypted;
}

