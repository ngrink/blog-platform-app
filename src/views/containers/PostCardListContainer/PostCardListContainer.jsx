import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { Spinner } from '@chakra-ui/react';

import { PostAPI } from '../../../modules/posts';
import { PostCardList } from '../../components/PostCardList';


export const PostCardListContainer = () => {
    const { isLoading, error, data: res } = useQuery(
        ['posts'],
        () => PostAPI.getAllPosts(),
        {staleTime: 1000 * 60 * 10}
    )

    if (isLoading) {
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
        <PostCardList posts={res.data}/>
    )
}
