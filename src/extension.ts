import * as vscode from 'vscode';
import { createOpenSiteQuickPick } from './search';
import { createInsertPlaceholderQuickPick } from './placeholder';
import { createTranslateByHover, createTranslateByInputBox, createTranslateByMenu, createTranslateByMenuReplace } from './translate';

export function activate(context: vscode.ExtensionContext) {

	const site = vscode.commands.registerCommand('simple.site', () => {
		createOpenSiteQuickPick();
	});

	const placeholder = vscode.commands.registerCommand('simple.placeholder', () => {
		createInsertPlaceholderQuickPick();
	});

	const translateByInput = vscode.commands.registerCommand('simple.translateByInput', () => {
		createTranslateByInputBox();
	});

	const translateByHover = createTranslateByHover();

	const translateByMenu = vscode.commands.registerCommand('simple.translateByMenu', () => {
		createTranslateByMenu();
	});

	const translateByMenuReplace = vscode.commands.registerCommand('simple.translateByMenuReplace', () => {
		createTranslateByMenuReplace();
	});

	context.subscriptions.push(site);
	context.subscriptions.push(placeholder);
	context.subscriptions.push(translateByInput);
	context.subscriptions.push(translateByHover);
	context.subscriptions.push(translateByMenu);
	context.subscriptions.push(translateByMenuReplace);
}


export function deactivate() { }
