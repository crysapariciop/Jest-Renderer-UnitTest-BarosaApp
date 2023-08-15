import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';
import { VerifyEmailAtom } from './atom';
import { useNetwork } from '@src/core-hooks/network';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
export const useVerifyEmail = () => {
  const { get, post } = useNetwork();
  const setVerifyEmailAtom = useSetRecoilState(VerifyEmailAtom);
  const verifyEmail = useCallback(
    (code: string) => {
      setVerifyEmailAtom((prev: any) => ({ ...prev, isLoaded: false }));
      get(`/codes?code=${code}`)
        .then((resp: any) => {
          if (resp.data && resp.data.success === true) {
            setVerifyEmailAtom((prev: any) => ({
              ...prev,
              data: { ...prev.data, verified: true },
            }));
            return;
          }
          setVerifyEmailAtom((prev: any) => ({
            ...prev,
            data: { ...prev.data, verified: false },
          }));
          setVerifyEmailAtom((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setVerifyEmailAtom((prev: any) => ({ ...prev, isLoaded: true }));
        });
    },
    [get, setVerifyEmailAtom]
  );
  const resendVerifyEmail = useCallback(
    (payload: any) => {
      setVerifyEmailAtom((prev: any) => ({ ...prev, isLoaded: false }));
      post(`/codes`, { type: 'email' })
        .then((resp: any) => {
          if (resp?.success) {
            Toast.show({
              type: 'error',
              text1: 'Email Verify',
              text2: resp?.message,
            });
          }
          if (resp.data && resp.data.success === true) {
            setVerifyEmailAtom((prev: any) => ({
              ...prev,
              data: { ...prev.data, verified: true },
            }));
            return;
          }
          setVerifyEmailAtom((prev: any) => ({
            ...prev,
            data: { ...prev.data, verified: false },
          }));
          setVerifyEmailAtom((prev: any) => ({ ...prev, error: true }));
        })
        .finally(() => {
          setVerifyEmailAtom((prev: any) => ({ ...prev, isLoaded: true }));
        });
    },
    [post, setVerifyEmailAtom]
  );
  return {
    verifyEmail,
    resendVerifyEmail,
  };
};
