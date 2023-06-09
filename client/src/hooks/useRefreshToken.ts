'use client';

import axios from '@/lib/axios';
import { signIn, useSession, signOut } from 'next-auth/react';

export const useRefreshToken = () => {
  const { data: session } = useSession();

  const refreshToken = async () => {
    const res = await axios
      .post('api/auth/refresh-token', {
        refreshToken: session?.user.refreshToken,
      })
      .catch((err) => {
        if (err.response.status === 401) {
          console.log(err.response.data);
        }
      });
    if (session) {
      session.user.accessToken = res?.data.data;
    } else {
      signIn();
    }
  };
  return refreshToken;
};
