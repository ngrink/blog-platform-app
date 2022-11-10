import React from 'react'
import { Box } from '@chakra-ui/react';
import moment from 'moment';

import { UserAvatar } from '../UserAvatar';


export const PostHeader = ({ author, createdAt }) => {
    return (
        <Box>
            <UserAvatar
                src={author.profile.avatar}
                name={author.profile.fullname}
                subtitle={moment(createdAt).fromNow()}
                />
        </Box>
    )
}
