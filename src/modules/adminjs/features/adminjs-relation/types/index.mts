import type {
  ActionResponse,
  BaseResource,
  ComponentLoader,
  RecordJSON,
} from 'adminjs';

export type RelationsFeatureConfig = {
  componentLoader: ComponentLoader;
  relations: RelationsFeatureOptions;
  propertyKey?: string;
};

export enum RelationType {
  OneToMany = 'one-to-many',
  ManyToMany = 'many-to-many',
}
export interface BaseRelationOptions {
  type: RelationType;
}
export interface OneToManyRelationOptions extends BaseRelationOptions {
  type: RelationType.OneToMany;
  target: {
    resourceId: string;
    joinKey: string;
    inverseJoinKey?: string;
  };
}
export interface ManyToManyRelationOptions extends BaseRelationOptions {
  type: RelationType.ManyToMany;
  junction: {
    joinKey: string;
    inverseJoinKey: string;
    throughResourceId: string;
  };
  target: {
    resourceId: string;
  };
  /**
   * Override default delete options.
   */
  deleteOptions?: {
    /**
     * Whether user can delete a relation (record in junction table)
     */
    enableDeleteRelation: boolean;
    /**
     * Whether user can delete related record (target record).
     * If target record's delete action is disabled, you won't be able to delete the record even if this option is set to true.
     */
    enableDeleteRelatedRecord: boolean;
  };
}
export type RelationOptions =
  | OneToManyRelationOptions
  | ManyToManyRelationOptions;
export type RelationsFeatureOptions<T = RelationOptions> = {
  [resourceId: string]: T;
};
export type RelationsActionResponse = ActionResponse & {
  /**
   * List of relation records
   */
  records: Array<RecordJSON>;
};
export interface RelationLoaderHandlerConfig<T = RelationOptions> {
  relation: T;
  targetResource: BaseResource;
  ownerResource: BaseResource;
}
