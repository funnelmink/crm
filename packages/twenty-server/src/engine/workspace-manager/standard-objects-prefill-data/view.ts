import { EntityManager } from 'typeorm';

import { ObjectMetadataEntity } from 'src/engine/metadata-modules/object-metadata/object-metadata.entity';
import {
  viewClientFields,
} from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-client-fields';
import {
  STANDARD_OBJECT_IDS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-ids';
import {
  STANDARD_ICONS,
} from 'src/engine/workspace-manager/workspace-sync-metadata/constants/standard-object-icons';
import { viewJobFields } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-job-fields';
import { viewCrewFields } from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-crew-fields';
import {
  viewEquipmentFields,
} from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-equipment-fields';
import {
  viewMaterialFields,
} from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-material-fields';
import {
  viewServiceFields,
} from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-service-fields';
import {
  viewWorkOrderFields,
} from 'src/engine/workspace-manager/standard-objects-prefill-data/funnelmink/view-workorder-fields';

export const viewPrefillData = async (
  entityManager: EntityManager,
  schemaName: string,
  objectMetadataMap: Record<string, ObjectMetadataEntity>,
) => {
  const createdViews = await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.view`, [
      'name',
      'objectMetadataId',
      'type',
      'key',
      'position',
      'icon',
      'kanbanFieldMetadataId',
    ])
    .values([
      {
        name: 'All Clients',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.client].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.client,
        kanbanFieldMetadataId: '',
      },
      {
        name: 'All Crews',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.crew].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.crew,
        kanbanFieldMetadataId: '',
      },
      {
        name: 'All Equipment',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.equipment].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.equipment,
        kanbanFieldMetadataId: '',
      },
      {
        name: 'All Jobs',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.jobs].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.job,
        kanbanFieldMetadataId: '',
      },
      {
        name: 'All Materials',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.material].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.material,
        kanbanFieldMetadataId: '',
      },
      {
        name: 'All Services',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.service].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.service,
        kanbanFieldMetadataId: '',
      },
      {
        name: 'All Work Orders',
        objectMetadataId: objectMetadataMap[STANDARD_OBJECT_IDS.workorder].id,
        type: 'table',
        key: 'INDEX',
        position: 0,
        icon: STANDARD_ICONS.workorder,
        kanbanFieldMetadataId: '',
      },
    ])
    .returning('*')
    .execute();

  const viewIdMap = createdViews.raw.reduce((acc, view) => {
    acc[view.name] = view.id;

    return acc;
  }, {});

  await entityManager
    .createQueryBuilder()
    .insert()
    .into(`${schemaName}.viewField`, [
      'fieldMetadataId',
      'viewId',
      'position',
      'isVisible',
      'size',
    ])
    .values([
      ...viewClientFields(viewIdMap['All Clients'], objectMetadataMap),
      ...viewJobFields(viewIdMap['All Jobs'], objectMetadataMap),
      ...viewCrewFields(viewIdMap['All Crews'], objectMetadataMap),
      ...viewEquipmentFields(viewIdMap['All Equipment'], objectMetadataMap),
      ...viewMaterialFields(viewIdMap['All Materials'], objectMetadataMap),
      ...viewServiceFields(viewIdMap['All Services'], objectMetadataMap),
      ...viewWorkOrderFields(viewIdMap['All Work Orders'], objectMetadataMap),
    ])
    .execute();
};
