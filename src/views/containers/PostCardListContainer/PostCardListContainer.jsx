import React, { useRef, useCallback } from 'react'
import { useQueryClient, useInfiniteQuery, useMutation } from '@tanstack/react-query';
import { VStack, Box, Spinner, useToast } from '@chakra-ui/react';

import { PostAPI } from '../../../modules/posts';
import { PostCardList } from '../../components/PostCardList';
import { connectionErrorToast } from '../../../utils/helpers';


export const PostCardListContainer = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const scrollObserver = useRef();

    const { isFetching, isFetchingNextPage, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: ({ pageParam = {page: 1, limit: 10} }) => PostAPI.getAllPosts(pageParam),
        getNextPageParam: (lastPage, pages) => (
            lastPage.hasNextPage
                ? {page: lastPage.nextPage, limit: lastPage.limit}
                : undefined
        )
    })

    const scrollRef = useCallback((node) => {
        if (isFetching || error) {
            return;
        }

        if (scrollObserver.current) {
            scrollObserver.current.disconnect();
        }
        scrollObserver.current = new IntersectionObserver(
            ([entry], observer) => {
                if (entry.isIntersecting) {
                    observer.unobserve(entry.target)
                    if (hasNextPage) fetchNextPage();
                }
            },
            { rootMargin: "0px 0px 3000px" }
        )
        if (node) {
            scrollObserver.current.observe(node);
        }
    }, [isFetching, error, hasNextPage, fetchNextPage]);


    const likeMutation = useMutation({
        mutationFn: (postId) => PostAPI.likePost(postId),
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['posts'] })
            const previousPosts = queryClient.getQueryData(['posts'])

            queryClient.setQueryData(['posts'], (data) => ({
                ...data, docs: data.docs.map(post => {
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

            queryClient.setQueryData(['posts'], (data) => ({
                ...data, docs: data.docs.map(post => {
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

    if (isFetching && !isFetchingNextPage) {
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
        <VStack as="ul" gap="50px" listStyleType="none">
            {data.pages.map(
                (page) => (
                    <Box as="li" key={page.page}>
                        <PostCardList
                            posts={page.docs}
                            onLike={(postId) => likeMutation.mutate(postId)}
                            onUnlike={(postId) => unlikeMutation.mutate(postId)}
                        />
                        <div ref={scrollRef}></div>
                    </Box>
                )
            )}
        </VStack>
    )
}
