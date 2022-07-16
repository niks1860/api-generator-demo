import { Model, model, property, PropertyForm } from '@loopback/repository';
import { ApiJsonSchema, JSONSchemaTypeName } from './api-json-schema.model';

/**
 * This model represents the property definition of a domain model
 */
@model({ settings: { strict: false } })
export class ApiPropertyDefinition extends Model {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description: 'Data type of the property',
      enum: Object.values(JSONSchemaTypeName)
    }
  })
  type?: JSONSchemaTypeName;

  @property({
    type: 'boolean',
    jsonSchema: {
      description: 'Treat the property as ID'
    }
  })
  id?: boolean;

  @property({
    type: 'boolean',
    jsonSchema: {
      description: 'Set to true to hide the property from response'
    }
  })
  hidden?: boolean;

  @property({
    type: () => ApiJsonSchema,
    jsonSchema: {
      description: 'JSON Schema of the property'
    }
  })
  jsonSchema?: ApiJsonSchema;

  @property({
    type: 'string',
    jsonSchema: {
      description: 'Type of the individual items if the type of the property is array',
      enum: Object.values(JSONSchemaTypeName)
    }
  })
  itemType?: JSONSchemaTypeName;

  @property({
    type: 'object',
    jsonSchema: {
      properties: {
        in: { type: 'boolean' },
        out: { type: 'boolean' },
        name: { type: 'string' }
      }
    }
  })
  json?: PropertyForm;

  @property({
    type: 'object',
    jsonSchema: {
      properties: {
        in: { type: 'boolean' },
        out: { type: 'boolean' },
        name: { type: 'string' }
      }
    }
  })
  store?: PropertyForm;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ApiPropertyDefinition>) {
    super(data);
  }
}

export interface ApiPropertyDefinitionRelations {
  // describe navigational properties here
}

export type ApiPropertyDefinitionWithRelations = ApiPropertyDefinition & ApiPropertyDefinitionRelations;
