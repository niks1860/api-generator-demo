import { Model, model, property, RelationType } from '@loopback/repository';

/**
 * This model represents relation with the other domain models
 */
@model({ settings: { strict: false } })
export class ApiModelRelation extends Model {
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      enum: Object.values(RelationType),
      description: 'The type of the relation'
    }
  })
  type: RelationType;

  @property({
    type: 'boolean',
    required: true,
    jsonSchema: {
      description: 'Set to true for relations targeting multiple instances(e.g. HasMany)'
    }
  })
  targetsMany: boolean;

  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description:
        'The relation name, typically matching the name of theaccessor property defined on the source model'
    }
  })
  name: string;

  // TODO: replace this with relation to ApiModel
  @property({
    type: 'string',
    required: true,
    jsonSchema: {
      description: 'The id of the target model of this relation'
    }
  })
  target: string;

  @property({
    type: 'string',
    jsonSchema: {
      description:
        'The foreign key used by the target model for this relation (default `SourceModelName + Id`'
    }
  })
  keyTo?: string;

  @property({
    type: 'string',
    jsonSchema: {
      description: 'The source key used by the source model for this relation (default `id`)'
    }
  })
  keyFrom?: string;

  @property({
    type: 'object',
    jsonSchema: {
      properties: {
        model: {
          type: 'string',
          description: 'The through model name'
        },
        keyFrom: {
          type: 'string',
          description: 'The foreign key of the source model defined in the through model'
        },
        keyTo: {
          type: 'string',
          description: 'The foreign key of the target model defined in the through model'
        },
        polymorphic: {
          anyOf: [
            { type: 'boolean' },
            {
              type: 'object',
              properties: {
                discriminator: { type: 'string' }
              },
              additionalProperties: false
            }
          ]
        }
      },
      required: ['model']
    }
  })
  through?: {
    model: string;
    keyFrom: string;
    keyTo: string;
    polymorphic?: boolean | { discriminator: string };
  };

  @property({
    jsonSchema: {
      description:
        'The polymorphism of the target model. The discriminator is a key of source model.' +
        'If the target model is not polymorphic, then the value should be left undefined or false;' +
        'If the key on source model indicating the concrete class of the target instance is default' +
        'i.e. camelCase(classNameOf(throughModelInstance)) + "Id"' +
        'Then the discriminator field can be undefined',
      anyOf: [
        { type: 'boolean' },
        {
          type: 'object',
          properties: {
            discriminator: { type: 'string' }
          },
          additionalProperties: false
        }
      ]
    }
  })
  polymorphic?: boolean | { discriminator: string };

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<ApiModelRelation>) {
    super(data);
  }
}

export interface ApiModelRelationRelations {
  // describe navigational properties here
}

export type ApiModelRelationWithRelations = ApiModelRelation & ApiModelRelationRelations;
