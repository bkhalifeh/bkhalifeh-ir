import { buildFeature, FeatureType } from 'adminjs';
import merge from 'lodash/merge.js';
import {
  addManyToManyRelationHandler,
  findRelationHandler,
  redirectToOwningResourceDetails,
  deleteRelationHandler,
  assignManyToManyRelation,
} from './actions/index.mjs';
import { emptyLocale, featureTranslations } from './translations.mjs';
import { bundleComponent } from './utils/index.mjs';
import { RelationsFeatureConfig } from './types/index.mjs';
const bundleRelationsComponents = (a) => ({
  show: bundleComponent(a, 'RelationsShowPropertyComponent'),
  edit: bundleComponent(a, 'RelationsEditPropertyComponent'),
  list: bundleComponent(a, 'RelationsListPropertyComponent'),
});

export const owningRelationSettingsFeature = (
  config: RelationsFeatureConfig,
): FeatureType => {
  const { componentLoader, relations, propertyKey = 'relations' } = config,
    { show, edit, list } = bundleRelationsComponents(componentLoader);
  return buildFeature(
    (componentLoader) => (
      (componentLoader.options.locale = merge(
        emptyLocale,
        featureTranslations,
        componentLoader.options.locale,
      )),
      {
        properties: {
          [propertyKey]: {
            isVisible: { show: !0, edit: !1, list: !1 },
            type: 'string',
            components: { show, edit, list },
            props: { relations: relations },
            position: Number.MAX_SAFE_INTEGER,
          },
        },
        actions: {
          findRelation: {
            actionType: 'record',
            isVisible: !1,
            handler: findRelationHandler(config),
          },
          addManyToManyRelation: {
            actionType: 'record',
            isVisible: !1,
            handler: addManyToManyRelationHandler(config),
          },
          deleteRelation: {
            actionType: 'record',
            isVisible: !1,
            handler: deleteRelationHandler(config),
          },
        },
      }
    ),
  );
};
export const targetRelationSettingsFeature = (): FeatureType =>
  buildFeature({
    actions: {
      edit: { after: [redirectToOwningResourceDetails] },
      new: {
        after: [assignManyToManyRelation, redirectToOwningResourceDetails],
      },
    },
  });
