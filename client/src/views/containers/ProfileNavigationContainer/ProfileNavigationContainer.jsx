import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthAPI, useAuth } from '../../../modules/auth'

import { ProfileNavigation } from '../../components/ProfileNavigation'


export const ProfileNavigationContainer = () => {
 const navigate = useNavigate()
 const { resetAuth } = useAuth()

    const onLogout = async () => {
        await AuthAPI.logout();
        resetAuth();
        navigate('/');
    }

    return (
        <ProfileNavigation
            isAuth={true}
            accountId={"636a5ef2558664b43a9707bd"}
            fullname={"Nikolay Grinko"}
            avatar={"https://sun9-61.userapi.com/s/v1/ig2/P-wFiz_hQ6zaKFB22cdQ27sz_h1SWyMOyfDel3kdd0HrK46c1RAkHhibfSOqoSYedQfcmLtLKGqyi4XpTDCkFNZX.jpg?size=200x200&quality=95&crop=612,204,580,580&ava=1"}
            onLogout={onLogout}
        />
    )
}
