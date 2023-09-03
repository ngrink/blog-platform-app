import React from 'react'
import { Flex, Spacer } from '@chakra-ui/react';
import moment from 'moment';

import { UserAvatar } from '../UserAvatar';
import { PostMenuContainer } from '../../containers/PostMenuContainer';


export const PostHeader = ({
    postId,
    author,
    publishedAt,
    isPostOwnedByUser,
    isPublished,
    isBookmarked
}) => {
    return (
        <Flex w="100%">
            <UserAvatar
                src={author.profile.avatar}
                name={author.profile.fullname}
                username={author.username}
                subtitle={isPublished ? moment(publishedAt).fromNow() : `Черновик`}
                />
            <Spacer />
            <PostMenuContainer
                postId={postId}
                isPostOwnedByUser={isPostOwnedByUser}
                isPublished={isPublished}
                isBookmarked={isBookmarked}
            />
        </Flex>
    )
}
