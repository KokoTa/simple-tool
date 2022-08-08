import * as vscode from 'vscode';
import { createOpenSiteQuickPick } from './search';
import { createInsertPlaceholderQuickPick } from './placeholder';
import { createHoverTranslate, createTranslateInputBox } from './translate';

export function activate(context: vscode.ExtensionContext) {

	const openSite = vscode.commands.registerCommand('simple.openSite', () => {
		createOpenSiteQuickPick();
	});

	const placeholder = vscode.commands.registerCommand('simple.placeholder', () => {
		createInsertPlaceholderQuickPick();
	});

	const translate = vscode.commands.registerCommand('simple.translate', () => {
		createTranslateInputBox();
	});
	const hoverTranslate = createHoverTranslate();

	context.subscriptions.push(openSite);
	context.subscriptions.push(placeholder);
	context.subscriptions.push(translate);
	context.subscriptions.push(hoverTranslate);
}


export function deactivate() { }
