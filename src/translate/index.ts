import * as vscode from 'vscode';
import { translateApi } from './config';
import * as md5 from 'md5';
import axios from 'axios';

function initBaiduConfig(query: string): BaiduTranslateConfig {
  const params: BaiduTranslateConfig = {
    q: query,
    from: 'auto',
    to: 'zh',
    appid: '20220807001297699',
    salt: Math.random().toString().slice(2),
    sign: ''
  };
  const sign = md5(
    params.appid + params.q + params.salt + 'u7y_jBpmOtuvA9bTBrx7'
  );
  params.sign = sign;
  return params;
}

export const createTranslateInputBox = async () => {
  const query = await vscode.window.showInputBox({
    placeHolder: 'Input query',
    validateInput: (text: string) => {
      return text.length > 0 ? null : 'Query is empty';
    }
  });

  const res = await axios.get(translateApi.baidu, {
    params: initBaiduConfig(query || '')
  });

  if (res.data?.trans_result) {
    vscode.window.showInformationMessage(res.data.trans_result[0].dst);
  }
};