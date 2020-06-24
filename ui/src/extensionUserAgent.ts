/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IAddUserAgent } from "../index";
import { getPackageInfo } from "./getPackageInfo";

/**
 * Adds a user agent specific to the VS Code extension, of the form `${extensionName}/${extensionVersion}`
 */
export function addExtensionUserAgent(client: IAddUserAgent): void {
    console.log(client);
    //client.addUserAgentInfo(getExtensionUserAgent());
}

function getExtensionUserAgent(): string {
    const { extensionName, extensionVersion } = getPackageInfo();
    return `${extensionName}/${extensionVersion}`;
}

export function appendExtensionUserAgent(existingUserAgent?: string): string {
    const extensionUserAgent: string = getExtensionUserAgent();

    existingUserAgent = existingUserAgent || extensionUserAgent;
    if (existingUserAgent.includes(extensionUserAgent)) {
        return existingUserAgent;
    } else {
        return `${existingUserAgent} ${extensionUserAgent}`;
    }
}
