'use client'

import { withPageAuthRequired } from '@auth0/nextjs-auth0/client';
import { useDataContext } from '../../contexts/DataProvider';

const ProfilePage =  () => {
  const { user } = useDataContext();
  return (
      <div>
      <h1>Welcome {user?.username}</h1>
   
    </div>


  )
}

export default withPageAuthRequired(ProfilePage)