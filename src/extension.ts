import * as vscode from 'vscode';
import { createOpenSiteQuickPick } from './search';
import { createInsertPlaceholderQuickPick } from './placeholder';

export function activate(context: vscode.ExtensionContext) {

	const openSite = vscode.commands.registerCommand('simple.openSite', () => {
		createOpenSiteQuickPick();
	});

	const insertPlaceholder = vscode.commands.registerCommand('simple.placeholder', () => {
		createInsertPlaceholderQuickPick();
	});

	context.subscriptions.push(openSite);
	context.subscriptions.push(insertPlaceholder);
}


export function deactivate() { }
