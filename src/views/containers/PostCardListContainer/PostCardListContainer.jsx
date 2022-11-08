import React from 'react'
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Spinner, useToast } from '@chakra-ui/react';

import { PostAPI } from '../../../modules/posts';
import { PostCardList } from '../../components/PostCardList';
import { connectionErrorToast } from '../../../utils/helpers';


export const PostCardListContainer = () => {
    const queryClient = useQueryClient();
    const toast = useToast();

    const { isLoading, error, data: res } = useQuery(
        ['posts'],
        () => PostAPI.getAllPosts(),
        {staleTime: 1000 * 60 * 10}
    )

    const likeMutation = useMutation({
        mutationFn: (postId) => PostAPI.likePost(postId),
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['posts'] })
            const previousPosts = queryClient.getQueryData(['posts'])

            queryClient.setQueryData(['posts'], posts => ({
                ...posts, data: posts.data.map(post => {
                    return post._id === postId
                        ? {
                            ...post,
                            likes: {
                                ...post.likes,
                                count: post.likes.count + 1,
                                isLikedByUser: true
                            }
                        }
                        : post
                })
            }))

            return { previousPosts }
          },
          onError: (err, postId, context) => {
            queryClient.setQueryData(['posts'], context.previousPosts);
            connectionErrorToast(toast);
          },
    })

    const unlikeMutation = useMutation({
        mutationFn: (postId) => PostAPI.unlikePost(postId),
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['posts'] })
            const previousPosts = queryClient.getQueryData(['posts'])

            queryClient.setQueryData(['posts'], posts => ({
                ...posts, data: posts.data.map(post => {
                    return post._id === postId
                        ? {
                            ...post,
                            likes: {
                                ...post.likes,
                                count: post.likes.count - 1,
                                isLikedByUser: false
                            }
                        }
                        : post
                })
            }))

            return { previousPosts }
          },
          onError: (err, postId, context) => {
            queryClient.setQueryData(['posts'], context.previousPosts);
            connectionErrorToast(toast);
          },
    })

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
        <PostCardList
            posts={res.data}
            onLike={(postId) => likeMutation.mutate(postId)}
            onUnlike={(postId) => unlikeMutation.mutate(postId)}
        />
    )
}
