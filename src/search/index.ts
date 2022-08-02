import * as vscode from 'vscode';
import { sites } from './config';

export const getSiteUrl = (targetSite: SiteType, queryStr: string): string => {
  if (targetSite.needQuery) {
    return targetSite.url + queryStr;
  }
  return targetSite.url;
};

export const createOpenSiteQuickPick = async () => {
  const labels: string[] = Object.keys(sites);
  const siteName = await vscode.window.showQuickPick(labels, {
    placeHolder: 'Select site'
  });

  if (siteName) {
    let queryStr: string = '';
    const targetSite: SiteType = sites[siteName];

    if (targetSite.needQuery) {
      const query = await vscode.window.showInputBox({
        placeHolder: 'Input query',
        validateInput: (text: string) => {
          return text.length > 0 ? null : 'Query is empty';
        }
      });
      queryStr = query || '';
    }

    const targetUrl = getSiteUrl(targetSite, queryStr);
    vscode.env.openExternal(vscode.Uri.parse(targetUrl));
  }
};