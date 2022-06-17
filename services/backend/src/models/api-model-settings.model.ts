import { Model, model, property } from '@loopback/repository';

@model()
export class ApiModelSettings extends Model {
  @property({
    type: 'string',
    jsonSchema: {
      description: 'Description of the API model',
      minLength: 3,
      maxLength: 100,
      errorMessage: {
        minLength: 'Description must have atleast 3 characters',
        maxLength: 'Description must have up to 100 characters'
      }
    }
  })
  description?: string;

  @property({
    type: 'boolean',
    default: true,
    jsonSchema: {
      description: 'Set it to `true` to prvent users from setting the auto-generated ID value mannualy'
    }
  })
  forceId?: boolean;

  @property({
    type: 'array',
    itemType: 'string',
    jsonSchema: {
      description: 'List of properties to be excluded from the API response'
    }
  })
  hiddenProperties?: string[];

  @property({
    type: 'object',
    jsonSchema: {
      description: 'Scope to apply to every query made for this model'
    }
  })
  scope?: object;

  @property({
    type: 'boolean',
    default: true,
    jsonSchema: {
      description:
        'Set it to false to allow users to set additional not registered properties to this model, only available in NoSQL databases'
    }
  })
  strict?: boolean;

  constructor(data?: Partial<ApiModelSettings>) {
    super(data);
  }
}

export interface ApiModelSettingsRelations {
  // describe navigational properties here
}

export type ApiModelSettingsWithRelations = ApiModelSettings & ApiModelSettingsRelations;
