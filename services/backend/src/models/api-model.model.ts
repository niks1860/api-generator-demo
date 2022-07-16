import { Entity, model, property } from '@loopback/repository';
import { getJsonSchema, getJsonSchemaRef } from '@loopback/rest';
import { ApiJsonSchema } from './api-json-schema.model';
import { ApiPropertyDefinition } from './api-model-property-definition.model';
import { ApiModelRelation } from './api-model-relation.model';
import { ApiModelSettings } from './api-model-settings.model';

/**
 * This entity represents the domain model
 */
@model({ settings: { strict: false } })
export class ApiModel extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description: 'The name of the domain model'
    }
  })
  name: string;

  @property({
    type: 'object',
    jsonSchema: {
      description: 'Properties of the domain model',
      additionalProperties: getJsonSchemaRef(ApiPropertyDefinition).definitions?.ApiPropertyDefinition
    }
  })
  properties?: { [key: string]: ApiPropertyDefinition };

  @property({
    type: () => ApiModelSettings,
    jsonSchema: {
      description: 'Settings of the domain model'
    }
  })
  settings?: ApiModelSettings;

  @property({
    type: 'object',
    jsonSchema: {
      description: 'Settings of the domain model',
      additionalProperties: getJsonSchemaRef(ApiModelRelation, { includeRelations: true }).definitions
        ?.ApiModelRelation
    }
  })
  relations?: { [key: string]: ApiModelRelation };

  @property({
    type: () => ApiJsonSchema,
    jsonSchema: {
      description: 'The JSON schema of the domain model'
    }
  })
  jsonSchema?: ApiJsonSchema;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ApiModel>) {
    super(data);
  }
}

export interface ApiModelRelations {
  // describe navigational properties here
}

export type ApiModelWithRelations = ApiModel & ApiModelRelations;
