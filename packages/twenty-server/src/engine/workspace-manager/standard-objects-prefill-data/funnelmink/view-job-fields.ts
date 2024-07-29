import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import {
  JOB_STANDARD_FIELD_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-field-ids';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';

export const viewJobFields = (
  viewId: string,
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return [
    {
      fieldMetadataId:
        objectMetadataMap[STANDARD_OBJECT_IDS.jobs].fields[
          JOB_STANDARD_FIELD_IDS.name
          ],
      viewId: viewId,
      position: 0,
      isVisible: true,
      size: 180,
    },
    {
      fieldMetadataId:
        objectMetadataMap[STANDARD_OBJECT_IDS.jobs].fields[
          JOB_STANDARD_FIELD_IDS.description
          ],
      viewId: viewId,
      position: 1,
      isVisible: true,
      size: 150,
    },
  ];
};