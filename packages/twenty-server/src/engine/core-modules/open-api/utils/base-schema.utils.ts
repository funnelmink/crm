import { OpenAPIV3_1 } from 'openapi-types';

import { computeOpenApiPath } from 'src/engine/core-modules/open-api/utils/path.utils';

export const API_Version = 'v0.1';

export const baseSchema = (
  schemaName: 'core' | 'metadata',
  serverUrl: string,
): OpenAPIV3_1.Document => {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Funnelmink Api',
      description: `This is a **Funnelmink REST/API** playground based on the **OpenAPI 3.0 specification**.`,
      termsOfService: 'https://github.com/funnelmink/crm?tab=coc-ov-file',
      contact: {
        email: 'funnelmink@gmail.com',
      },
      license: {
        name: 'AGPL-3.0',
        url: 'https://github.com/funnelmink/crm?tab=AGPL-3.0-1-ov-file#readme',
      },
      version: API_Version,
    },
    // Testing purposes
    servers: [
      {
        url: `${serverUrl}/rest/${schemaName !== 'core' ? schemaName : ''}`,
        description: 'Production Development',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description:
            'Enter the token with the `Bearer: ` prefix, e.g. "Bearer abcde12345".',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
    externalDocs: {
      description: 'Find out more about **Funnelmink**',
      url: 'https://funnelmink.com',
    },
    paths: { [`/open-api/${schemaName}`]: computeOpenApiPath(serverUrl) },
  };
};
