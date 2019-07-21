/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzureServiceClientOptions as AzureServiceClientOptionsV2 } from "@azure/ms-rest-azure-js";
import { ServiceClientCredentials as ServiceClientCredentialsV2 } from "@azure/ms-rest-js";
import { DeviceTokenCredentials as DeviceTokenCredentialsV2 } from '@azure/ms-rest-nodeauth';
import { ServiceClientCredentials } from "ms-rest";
import { appendExtensionUserAgent } from "./extensionUserAgent";

export function createAzureClientV2<T>(
    clientInfo: { credentials: ServiceClientCredentials; subscriptionId: string; environment: { resourceManagerEndpointUrl: string }; },
    clientType: new (credentials: ServiceClientCredentialsV2, subscriptionId: string, options?: AzureServiceClientOptionsV2 & { baseUri?: string }) => T): T {

    // tslint:disable-next-line: no-any
    const credV1: { [key: string]: any } = clientInfo.credentials;
    // tslint:disable-next-line: no-unsafe-any
    const credV2: DeviceTokenCredentialsV2 = new DeviceTokenCredentialsV2(credV1.clientId, credV1.domain, credV1.username, credV1.tokenAudience, credV1.environment, credV1.tokenCache);
    return new clientType(<ServiceClientCredentialsV2><unknown>credV2, clientInfo.subscriptionId, { baseUri: clientInfo.environment.resourceManagerEndpointUrl, userAgent: appendExtensionUserAgent });
}
