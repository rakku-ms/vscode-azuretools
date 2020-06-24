/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServiceClientCredentials } from "ms-rest";
import { AzureEnvironment, AzureServiceClientOptions } from "ms-rest-azure";
import { IAddUserAgent } from "../index";
import { addExtensionUserAgent } from "./extensionUserAgent";

export function createAzureClient<T extends IAddUserAgent>(
    clientInfo: { credentials: ServiceClientCredentials; subscriptionId: string; environment: AzureEnvironment; },
    clientType: new (credentials: ServiceClientCredentials, subscriptionId: string, clientOptions?: {}, options?: AzureServiceClientOptions) => T): T {
    var clientOptions = { "baseUri": clientInfo.environment.resourceManagerEndpointUrl };
    const client: T = new clientType(clientInfo.credentials, clientInfo.subscriptionId, clientOptions);
    addExtensionUserAgent(client);
    return client;
}

export function createAzureSubscriptionClient<T extends IAddUserAgent>(
    clientInfo: { credentials: ServiceClientCredentials; environment: AzureEnvironment; },
    clientType: new (credentials: ServiceClientCredentials, baseUri?: string, options?: AzureServiceClientOptions) => T): T {
    const client: T = new clientType(clientInfo.credentials, clientInfo.environment.resourceManagerEndpointUrl);
    addExtensionUserAgent(client);
    return client;
}
