/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

// tslint:disable-next-line:no-require-imports
import opn = require("opn");

export async function openUrl(url: string): Promise<void> {
    // Using this functionality is blocked by https://github.com/Microsoft/vscode/issues/25852:
    // await vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url));

    // tslint:disable-next-line: no-unsafe-any
    opn(url);
}
