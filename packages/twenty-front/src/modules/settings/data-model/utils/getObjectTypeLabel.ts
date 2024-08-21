import { ObjectMetadataItem } from '@/object-metadata/types/ObjectMetadataItem';
import { isRequiredByFunnelmink } from '~/funnelmink/funnelmink-front-constants';

export type ObjectTypeLabel =
  | StandardObjectTypeLabel
  | CustomObjectTypeLabel
  | RemoteObjectTypeLabel;

type StandardObjectTypeLabel = {
  labelText: 'Standard';
  labelColor: 'blue';
};

type CustomObjectTypeLabel = {
  labelText: 'Custom';
  labelColor: 'orange';
};

type RemoteObjectTypeLabel = {
  labelText: 'Remote';
  labelColor: 'green';
};

export const getObjectTypeLabel = (
  objectMetadataItem: ObjectMetadataItem,
): ObjectTypeLabel =>
  isRequiredByFunnelmink(objectMetadataItem.namePlural)
    ? {
        labelText: 'Standard',
        labelColor: 'blue',
      }
    : objectMetadataItem.isCustom
      ? {
          labelText: 'Custom',
          labelColor: 'orange',
        }
      : objectMetadataItem.isRemote
        ? {
            labelText: 'Remote',
            labelColor: 'green',
          }
        : {
            labelText: 'Standard',
            labelColor: 'blue',
          };
