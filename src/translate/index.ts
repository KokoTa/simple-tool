import * as vscode from 'vscode';
import { translateApi } from './config';
import * as md5 from 'md5';
import axios from 'axios';

async function createBaiduTranslateRequest(query: string): Promise<string> {
  try {
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
    const results = res.data.trans_result?.map((item: BaiduTranslateResult) => item.dst);
    return results!.join('\n');
  } catch (error) {
    console.log(error);
    return '';
  }
}

export const createTranslateByInputBox = async () => {
  const query = await vscode.window.showInputBox({
    placeHolder: 'Input query',
    validateInput: (text: string) => {
      return text.length > 0 ? null : 'Query is empty';
    }
  });
  const res = await createBaiduTranslateRequest(query || '');
  res && vscode.window.showInformationMessage(res);
};

export const createTranslateByHover = () => {
  return vscode.languages.registerHoverProvider('*', {
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

const outputChannel = vscode.window.createOutputChannel('simple-tool-translate');

export const createTranslateByMenu = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const selection = editor.selection;
  const text = editor.document.getText(selection);
  if (!text) { return; }

  await vscode.window.withProgress({
    title: 'Translating',
    location: vscode.ProgressLocation.Notification
  }, async () => {
    const res = await createBaiduTranslateRequest(text);
    outputChannel.show();
    outputChannel.appendLine(res);
  });
};

export const createTranslateByMenuReplace = async () => {
  const editor = vscode.window.activeTextEditor;
  if (!editor) { return; }

  const selection = editor.selection;
  const text = editor.document.getText(selection);
  if (!text) { return; }

  await vscode.window.withProgress({
    title: 'Translating',
    location: vscode.ProgressLocation.Notification
  }, async () => {
    const res = await createBaiduTranslateRequest(text);
    await editor.edit((editBuilder) => {
      editBuilder.replace(selection, res);
    });
  });
};