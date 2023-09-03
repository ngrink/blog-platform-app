import React from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';

import { PostAPI } from '../../../modules/posts';
import { Post } from '../../components/Post';


export const PostContainer = () => {
    const { postId } = useParams();
    const { isLoading ,error, data } = useQuery(
        ['posts', postId],
        () => PostAPI.getPost(postId),
        { staleTime: 0 }
    )

    const commentsData = useQuery(
      ['posts', postId, 'comments'],
      () => PostAPI.getPostComments(postId),
      { staleTime: 0 }
  )

    if (isLoading || commentsData.isLoading) {
        return (
            <Spinner
                thickness='4px'
                speed='0.25s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
            )
        }

    if (error) {
        return <span>Error: {error}</span>
    }

    return (
        <Post {...data} commentsData={commentsData.data}/>
    )
}
