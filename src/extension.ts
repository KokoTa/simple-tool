import * as vscode from 'vscode';
import * as path from 'path';
import { createOpenSiteQuickPick } from './search';
import { createInsertPlaceholderQuickPick } from './placeholder';

const cats = {
	'codingCat': 'https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif',
	'compilingCat': 'https://media.giphy.com/media/mlvseq9yvZhba/giphy.gif'
};

function getWebviewContent(url: string | vscode.Uri) {
	return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Cat Coding</title>
		</head>
		<body>
				<img src="${url}" width="300" />
		</body>
		</html>
	`;
}

export function activate(context: vscode.ExtensionContext) {
	let currentPanel: vscode.WebviewPanel;

	let createWebview = vscode.commands.registerCommand('simple.createWebview', () => {
		const activeColum = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.viewColumn : undefined;

		if (currentPanel) {
			currentPanel.reveal(activeColum);
		} else {
			currentPanel = vscode.window.createWebviewPanel(
				'simple',
				'simple webview',
				vscode.ViewColumn.One,
				{}
			);

			const updateView = () => {
				const catPath = vscode.Uri.file(
					path.join(context.extensionPath, 'src/image', 'cat.gif')
				);
				const catGifUrl = currentPanel.webview.asWebviewUri(catPath);
				(currentPanel.webview.html = getWebviewContent(catGifUrl));
			};

			const timer = setInterval(updateView, 5000);

			currentPanel.onDidDispose(() => {
				clearInterval(timer);
			}, null, context.subscriptions);
		}

	});

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
