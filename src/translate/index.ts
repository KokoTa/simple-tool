import * as vscode from 'vscode';
import { translateApi } from './config';
import * as md5 from 'md5';
import axios, { AxiosResponse } from 'axios';

async function createBaiduTranslateRequest(query: string): Promise<string> {
  const params: BaiduTranslateConfig = {
    q: query,
    from: 'auto',
    to: 'zh',
    appid: '20220807001297699',
    salt: Math.random().toString().slice(2),
    sign: ''
  };
  params.sign = md5(params.appid + params.q + params.salt + 'u7y_jBpmOtuvA9bTBrx7');
  const res = await axios.get(translateApi.baidu, { params });
  return res.data.trans_result[0].dst;
}

export const createTranslateInputBox = async () => {
  const query = await vscode.window.showInputBox({
    placeHolder: 'Input query',
    validateInput: (text: string) => {
      return text.length > 0 ? null : 'Query is empty';
    }
  });
  const res = await createBaiduTranslateRequest(query || '');
  res && vscode.window.showInformationMessage(res);
};

export const createHoverTranslate = () => {
  return vscode.languages.registerHoverProvider('javascript', {
    async provideHover(document, position, token) {
      const editor = vscode.window.activeTextEditor;

      if (!editor) {
        return new vscode.Hover('');
      }

      const selection = editor.selection;
      if (selection.isEmpty) {
        return new vscode.Hover('');
      }

      const text = document.getText(selection);
      if (!text) {
        return new vscode.Hover('');
      }

      const res = await createBaiduTranslateRequest(text);
      return new vscode.Hover(res);
    }
  });
};

export const createMenuTranslate = () => {

};