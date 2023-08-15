import { atom } from 'recoil';

import { IVerifyEmailAtom } from './types';

export const VerifyEmailAtom = atom<IVerifyEmailAtom>({
  key: 'Verify-Email-Atom-key',
  default: {
    isLoaded: false,
    error: true,
    loaded: false,
    data: {},
  },
});
