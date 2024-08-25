import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import { FUNNELMINK_IDS } from 'src/funnelmink/funnelmink-server-constants';

export const workOrdersAllView = async (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'All',
    objectMetadataId: objectMetadataMap[FUNNELMINK_IDS.workOrder].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: 'IconList',
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.workOrder].fields[
            FUNNELMINK_IDS.workOrderName
          ],
        position: 0,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.workOrder].fields[
            FUNNELMINK_IDS.workOrderCompany
          ],
        position: 1,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.workOrder].fields[
            FUNNELMINK_IDS.workOrderCreatedBy
          ],
        position: 2,
        isVisible: true,
        size: 150,
      },
    ],
  };
};
