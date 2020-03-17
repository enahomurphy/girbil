import { storage, get } from '@shared/lib';

export const useOrg = () => get(storage.payload, 'organization', null);

export const useUser = () => get(storage.payload, 'user', {
  id: '',
});