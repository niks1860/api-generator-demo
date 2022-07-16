import { Model, model, property } from '@loopback/repository';

export enum StringFormat {
  DaeTime = 'date-time',
  Date = 'date',
  Time = 'time',
  Email = 'email',
  Hostname = 'hostname',
  IDNHostname = 'idn-hostname',
  IPV4 = 'ipv4',
  IPV6 = 'ipv6',
  URI = 'uri',
  URIReference = 'uri-reference',
  IRI = 'iri',
  IRIReference = 'iri-reference',
  URITemplate = 'uri=template',
  JSONPointer = 'json-pointer',
  RelativeJSONPointer = 'relative-json-pointer',
  Regex = 'regex'
}

export enum JSONSchemaTypeName {
  String = 'string',
  Number = 'number',
  Integer = 'integer',
  Boolean = 'boolean',
  Object = 'object',
  Array = 'array',
  Null = 'null'
}

export type JSONSchemaType =
  | string //
  | number
  | boolean
  | JSONSchemaObject
  | JSONSchemaArray
  | null;

// Workaround for infinite type recursion
export interface JSONSchemaObject {
  [key: string]: JSONSchemaType;
}

// Workaround for infinite type recursion
// https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
export interface JSONSchemaArray extends Array<JSONSchemaType> {}

/**
 * This model represents the JSON schema for an json instance,
 * which can be used to model the `Entity` or `Model` used as domain model
 */
@model({ settings: { strict: false } })
export class ApiJsonSchema extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      description: 'Short name of the key associated with this JSON schema'
    }
  })
  title?: string;

  @property({
    type: 'string',
    jsonSchema: {
      description: 'Description of the key associated with this JSON schema'
    }
  })
  description?: string;

  @property({
    type: 'any',
    jsonSchema: {
      description: "Default value if one isn't provided"
    }
  })
  default?: any;

  @property({
    type: 'boolean',
    default: false,
    jsonSchema: {
      description: 'Set to true if the key is readonly'
    }
  })
  readOnly?: boolean;

  @property({
    type: 'boolean',
    default: false,
    jsonSchema: {
      description: 'Set to true if the key is wirteonly'
    }
  })
  writeOnly?: boolean;

  @property({
    type: 'string',
    jsonSchema: {
      description: 'Type of the value of the key',
      enum: Object.values(JSONSchemaTypeName)
    }
  })
  type?: JSONSchemaTypeName;

  @property.array(String, {
    jsonSchema: {
      description: 'Array of fix possible values for key',
      minItems: 1
    }
  })
  enum?: string[];

  @property({
    type: 'any',
    jsonSchema: {
      description: 'Fix value of the key'
    }
  })
  const?: JSONSchemaType;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Lower limit of the numeric type key'
    }
  })
  minimum?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Uper limit of the numeric type key'
    }
  })
  maximum?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Exclusive lower limit of the numeric type key'
    }
  })
  exclusiveMinimum?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Exclusive upper limit of the numeric type key'
    }
  })
  exclusiveMaximum?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: "Division of value of key by this keyword's value must be integer"
    }
  })
  multipleOf?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Minimum length of the string key type'
    }
  })
  minLength?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Maximum length of the string key type'
    }
  })
  maxLength?: number;

  @property({
    type: 'string',
    jsonSchema: {
      description: 'Regular expression which string value must match with'
    }
  })
  pattern?: string;

  @property.array(ApiJsonSchema, {
    jsonSchema: {
      description: 'Data type of items if property is array type'
    }
  })
  items?: ApiJsonSchema[];

  @property({
    type: ApiJsonSchema,
    jsonSchema: {
      description: 'Type of additional items at position greater than the number of elements in item keyword'
    }
  })
  additionalItems?: ApiJsonSchema;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Maximum number of elements in an array, if property is array type'
    }
  })
  maxItems?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Minimum number of elements in an array, if property is array type'
    }
  })
  minItems?: number;

  @property({
    type: 'boolean',
    jsonSchema: {
      description: 'Set to true if items in the array must be unique'
    }
  })
  uniqueItems?: boolean;

  @property({
    type: ApiJsonSchema,
    jsonSchema: {
      description:
        'Validates if atleast one of the element of the array is valid against schema of this keyword'
    }
  })
  contains?: ApiJsonSchema;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Maximum number of properties allowed in an object type'
    }
  })
  maxProperties?: number;

  @property({
    type: 'number',
    jsonSchema: {
      description: 'Minimum number of properties allowed in an object type'
    }
  })
  minProperties?: number;

  @property({
    type: 'object',
    jsonSchema: {
      description: 'Properties of an object type',
      additionalProperties: { $ref: '#' },
      propertyNames: {
        minLength: 1
      }
    }
  })
  properties?: { [key: string]: ApiJsonSchema };

  @property({
    type: 'object',
    jsonSchema: {
      description: 'Pattern based properties of an object type with keys based on regex',
      additionalProperties: { $ref: '#' },
      propertyNames: {
        minLength: 1
      }
    }
  })
  patternProperties?: { [key: string]: ApiJsonSchema };

  @property({
    type: ApiJsonSchema,
    jsonSchema: {
      description: 'Schema of additional properties for object type not covered by `patternProperties`'
    }
  })
  additionalProperties?: ApiJsonSchema;

  @property({
    jsonSchema: {
      type: 'object',
      description: 'Dependencies for properties of an object type',
      additionalProperties: {
        anyOf: [
          {
            $ref: '#'
          },
          {
            type: 'array',
            items: { type: 'string' }
          }
        ]
      },
      propertyNames: {
        minLength: 1
      }
    }
  })
  dependencies?: ApiJsonSchema | string[];

  @property({
    type: ApiJsonSchema,
    jsonSchema: {
      description: 'List of required properties for an object type'
    }
  })
  propertyNames?: ApiJsonSchema;

  @property.array(String, {
    jsonSchema: {
      description: 'List of required properties for an object type'
    }
  })
  required?: string[];

  @property.array(ApiJsonSchema, {
    jsonSchema: {
      description: 'Value of the key must validate against all schemas defined by this keyword'
    }
  })
  allOf?: ApiJsonSchema[];

  @property.array(ApiJsonSchema, {
    jsonSchema: {
      description: 'Value of the key must validate against atleast one of the schemas defined by this keyword'
    }
  })
  anyOf?: ApiJsonSchema[];

  @property.array(ApiJsonSchema, {
    jsonSchema: {
      description: 'Value of the key must validate against exactly one of the schemas defined by this keyword'
    }
  })
  oneOf?: ApiJsonSchema[];

  @property({
    type: ApiJsonSchema,
    jsonSchema: {
      description: 'Value of the key must fail to validate against schema defined by this keyword'
    }
  })
  not?: ApiJsonSchema;

  @property({
    type: 'string',
    jsonSchema: {
      description: 'Value must validate against particular format',
      enum: Object.values(StringFormat)
    }
  })
  format?: StringFormat;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ApiJsonSchema>) {
    super(data);
  }
}

export interface ApiJsonSchemaRelations {
  // describe navigational properties here
}

export type ApiJsonSchemaWithRelations = ApiJsonSchema & ApiJsonSchemaRelations;
