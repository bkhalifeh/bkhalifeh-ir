import { Messages, Labels, Actions } from './constants/messages.mjs';
const messagesTranslations = {
    [Messages.MissingConfiguration]:
      '[@adminjs/relations] Missing configuration for one of the relations: {{relationName}}',
    [Messages.MissingRecordId]:
      '[@adminjs/relations] "recordId" is missing in request\'s query params',
    [Messages.InvalidRelationType]:
      '[@adminjs/relations] Invalid "type" for relation. Valid relation types: {{validTypes}}',
    [Messages.JoinKeyMissing]:
      '[@adminjs/relations] "joinKey" must be defined for "target"',
    [Messages.NoRelationRecordsTitle]: 'No related records',
    [Messages.NoRelationRecords]:
      'There are no records from "{{relationName}}" related with this record',
    [Messages.JunctionMissing]:
      '[@adminjs/relations] "junction" must be defined for many-to-many relation',
    [Messages.JunctionResourceIdMissing]:
      '[@adminjs/relations] "junction.throughResourceId" must be defined for many-to-many-relation',
    [Messages.JunctionResourceMissing]:
      '[@adminjs/relations] {{junctionResourceId}} resource is missing. Are you sure you have registered it in AdminJS?',
    [Messages.ChooseItemSubtitle]: 'Select an item to add',
    [Messages.ManyToManyRelationAlreadyExists]:
      'Given relation already exists.',
    [Messages.RelationSuccessfullyAdded]:
      'Relation has been successfully added.',
    [Messages.RelationSuccessfullyDeleted]:
      'Relation has been successfully deleted.',
    [Messages.QueryParamsMissing]:
      "[@adminjs/relations] Insufficient query parameters. Make sure you do not modify the browser's address bar.",
    [Messages.JunctionRecordMissing]:
      '[@adminjs/relations] Could not find a junction record.',
  },
  labelsTranslations = {
    [Labels.ChooseItemHeader]: 'Add existing item',
    [Labels.DeleteRelationHeader]: 'Decide what to delete',
  },
  actionsTranslations = {
    [Actions.AddItem]: 'Add existing item',
    [Actions.RemoveRelation]: 'Remove relation',
    [Actions.RemoveRecord]: 'Delete record',
  };
export const featureTranslations = {
  translations: {
    en: {
      messages: messagesTranslations,
      labels: labelsTranslations,
      actions: actionsTranslations,
    },
  },
};
export const emptyLocale = { language: 'en', translations: {} };
