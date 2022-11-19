import React, { useRef, useCallback, useMemo, useState } from 'react'
import { useQueryClient, useInfiniteQuery, useMutation, QueryObserver } from '@tanstack/react-query';
import { VStack, Box, Spinner, useToast } from '@chakra-ui/react';

import { PostAPI } from '../../../modules/posts';
import { PostCardList } from '../../components/PostCardList';
import { toastError } from '../../../utils/helpers/toasts';


export const PostCardListContainer = ({ feed }) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const scrollObserver = useRef();
    const [deletedPosts, setDeletedPosts] = useState(new Set());

    const { isFetching, isFetchingNextPage, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['posts', { feed }],
        queryFn: ({ pageParam = {page: 1, limit: 10} }) => PostAPI.getAllPosts({...pageParam, feed}),
        getNextPageParam: (lastPage, pages) => (
            lastPage.hasNextPage
                ? {page: lastPage.nextPage, limit: lastPage.limit}
                : undefined
        ),
        staleTime: 60000
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
            toast(toastError());
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
            toast(toastError());
          },
    })

    const observer = useMemo(() => {
        return new QueryObserver(queryClient, {
            queryKey: ['posts', {deleted: true}],
            retry: 0,
            initialData: new Set(),
        })
    }, [queryClient])

    observer.subscribe(({data}) => {
        if (data) setDeletedPosts(data);
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
                    <Box as="li" key={page.page} w="100%">
                        <PostCardList
                            posts={page.docs}
                            deletedPosts={deletedPosts}
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
