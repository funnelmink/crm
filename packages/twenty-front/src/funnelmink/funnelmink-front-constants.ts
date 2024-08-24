export const isRequiredByFunnelmink = (objectName: string): boolean =>
  [
    'people',
    'companies',
    'opportunities',
    'workOrders',
    'services',
    'crews',
    'materials',
    'jobs',
  ].includes(objectName);
