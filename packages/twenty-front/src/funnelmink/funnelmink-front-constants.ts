export const isRequiredByFunnelmink = (objectName: string): boolean =>
  [
    'people',
    'companies',
    'opportunities',
    'workorders',
    'services',
    'crews',
    'materials',
    'jobs',
  ].includes(objectName);
