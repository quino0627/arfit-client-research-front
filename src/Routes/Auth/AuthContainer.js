import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../Hooks/useInput';
import { useMutation } from '@apollo/react-hooks';
import { LOG_IN, LOCAL_LOG_IN } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
  const [action, setAction] = useState('logIn');
  const secret = useInput('');
  const [confirmSecretMutation] = useMutation(LOG_IN, {
    // 업데이트의 경우에는 Client.js를 건드리거나, 캐쉬, Default를 건드리고 싶을 때 사용함
    // update: (_, { data }) => {
    //   const { confirmSecret } = data;
    //   if (confirmSecret === null) {
    //     toast.error('받은 키 값을 확인해주세요.');
    //     setTimeout(3000);
    //   }
    // },
    variables: {
      secret: secret.value,
    },
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN, {
    variables: {
      secret: secret.value,
    },
  });

  const onLogin = async (e) => {
    e.preventDefault();
    if (secret !== '') {
      try {
        const {
          data: { confirmSecret: token },
        } = await confirmSecretMutation();

        if (token === null) {
          toast.error('받은 키 값을 확인해주세요.');
        } else {
          localLogInMutation({ variables: { token } });
        }
      } catch (e) {
        console.log(e);
        toast.error('완료할 수 없습니다. 잠시 후 다시 시도하세요');
      }
    } else {
      toast.error('빈 칸일 수 없습니다.');
    }
  };

  return (
    <AuthPresenter
      setAction={setAction}
      action={action}
      secret={secret}
      onLogin={onLogin}
    />
  );
};
