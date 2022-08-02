import { placeholders } from "./config";
import * as vscode from 'vscode';

export const createInsertPlaceholderQuickPick = async () => {
  const labels: string[] = Object.keys(placeholders);
  const placeholderName = await vscode.window.showQuickPick(labels, {
    placeHolder: 'Select placeholder'
  });

  const width = await vscode.window.showInputBox({
    placeHolder: 'Input width',
    validateInput: text => {
      return /^-?[1-9]\d*$/.test(text) ? null : 'Width is invalid';
    }
  });

  const height = await vscode.window.showInputBox({
    placeHolder: 'Input height',
    validateInput: text => {
      return /^-?[1-9]\d*$/.test(text) ? null : 'Height is invalid';
    }
  });

  if (placeholderName && width && height) {
    const placeholder = placeholders[placeholderName];
    const targetUrl = placeholder
      .replace('?x?', `${width}x${height}`)
      .replace('?/?', `${width}x${height}`);
    const activeEditor = vscode.window.activeTextEditor;
    activeEditor?.edit((editBuilder) => {
      activeEditor?.selections.forEach(selection => {
        editBuilder.insert(selection.active, targetUrl);
      });
    });
  }
};