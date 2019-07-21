/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureServiceClientOptions as AzureServiceClientOptionsV2 } from "@azure/ms-rest-azure-js";
import { ServiceClientCredentials as ServiceClientCredentialsV2 } from "@azure/ms-rest-js";
import { ServiceClientCredentials } from "ms-rest";
import { AzureServiceClientOptions } from "ms-rest-azure";
import { IAddUserAgent } from "../index";
import { addExtensionUserAgent } from "./extensionUserAgent";

export type ClientV2Type<T> = new (credentials: ServiceClientCredentialsV2, subscriptionId: string, options?: AzureServiceClientOptionsV2) => T;

// constructor(credentials: msRest.ServiceClientCredentials, subscriptionId: string, options?: Models.WebSiteManagementClientOptions)

export function createAzureClient<T extends IAddUserAgent>(
    clientInfo: { credentials: ServiceClientCredentials; subscriptionId: string; environment: { resourceManagerEndpointUrl: string }; },
    clientType: new (credentials: ServiceClientCredentials, subscriptionId: string, baseUri?: string, options?: AzureServiceClientOptions) => T): T {
    const client: T = new clientType(clientInfo.credentials, clientInfo.subscriptionId, clientInfo.environment.resourceManagerEndpointUrl);
    addExtensionUserAgent(client);
    return client;
}

export function createAzureSubscriptionClient<T extends IAddUserAgent>(
    clientInfo: { credentials: ServiceClientCredentials; environment: { resourceManagerEndpointUrl: string }; },
    clientType: new (credentials: ServiceClientCredentials, baseUri?: string, options?: AzureServiceClientOptions) => T): T {
    const client: T = new clientType(clientInfo.credentials, clientInfo.environment.resourceManagerEndpointUrl);
    addExtensionUserAgent(client);
    return client;
}
