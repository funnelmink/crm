import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import {
  FUNNELMINK_ICONS,
  FUNNELMINK_IDS,
} from 'src/funnelmink/funnelmink-server-constants';

export const workOrdersAllView = async (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'All',
    objectMetadataId: objectMetadataMap[FUNNELMINK_IDS.workOrder].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: FUNNELMINK_ICONS.listView,
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

export const servicesAllView = async (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'All',
    objectMetadataId: objectMetadataMap[FUNNELMINK_IDS.service].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: FUNNELMINK_ICONS.listView,
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.service].fields[
            FUNNELMINK_IDS.serviceName
          ],
        position: 0,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.service].fields[
            FUNNELMINK_IDS.serviceCreatedBy
          ],
        position: 1,
        isVisible: true,
        size: 150,
      },
    ],
  };
};

export const crewsAllView = async (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'All',
    objectMetadataId: objectMetadataMap[FUNNELMINK_IDS.crew].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: FUNNELMINK_ICONS.listView,
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.crew].fields[
            FUNNELMINK_IDS.crewName
          ],
        position: 0,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.crew].fields[
            FUNNELMINK_IDS.crewCreatedBy
          ],
        position: 1,
        isVisible: true,
        size: 150,
      },
    ],
  };
};

export const materialsAllView = async (
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  return {
    name: 'All',
    objectMetadataId: objectMetadataMap[FUNNELMINK_IDS.material].id,
    type: 'table',
    key: 'INDEX',
    position: 0,
    icon: FUNNELMINK_ICONS.listView,
    kanbanFieldMetadataId: '',
    filters: [],
    fields: [
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.material].fields[
            FUNNELMINK_IDS.materialName
          ],
        position: 0,
        isVisible: true,
        size: 150,
      },
      {
        fieldMetadataId:
          objectMetadataMap[FUNNELMINK_IDS.material].fields[
            FUNNELMINK_IDS.materialCreatedBy
          ],
        position: 1,
        isVisible: true,
        size: 150,
      },
    ],
  };
};
