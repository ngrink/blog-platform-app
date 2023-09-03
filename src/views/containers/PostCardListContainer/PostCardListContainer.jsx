import React, { useRef, useCallback, useMemo, useState } from 'react'
import { observer } from 'mobx-react-lite';
import { useQueryClient, useInfiniteQuery, useMutation, QueryObserver } from '@tanstack/react-query';
import { VStack, Box, Spinner, useToast, Flex } from '@chakra-ui/react';

import { PostAPI } from '../../../modules/posts';
import { PostCardList } from '../../components/PostCardList';
import { BookmarksEmptyPlaceholder, FollowedEmptyPlaceholder, OwnPostsEmptyPlaceholder, PostsEmptyPlaceholder } from '../../components/EmptyPlaceholder/EmptyPlaceholder';
import { toastError } from '../../../utils/helpers/toasts';
import { useStore } from '../../../app/store';


export const PostCardListContainer = observer(({ feed }) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const scrollObserver = useRef();
    const [deletedPosts, setDeletedPosts] = useState(new Set());
    const { PostStore } = useStore();

    const searchQuery = PostStore.searchQuery;

    const { isFetching, isFetchingNextPage, error, data, hasNextPage, fetchNextPage } = useInfiniteQuery({
        queryKey: ['posts', { feed }],
        queryFn: ({ pageParam = {page: 1, limit: 10} }) => PostAPI.getAllPosts({...pageParam, feed}),
        getNextPageParam: (lastPage, pages) => (
            lastPage.hasNextPage
                ? {page: lastPage.nextPage, limit: lastPage.limit}
                : undefined
        ),
        staleTime: 0
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


    // const likeMutation = useMutation({
    //     mutationFn: (postId) => PostAPI.likePost(postId),
    //     onMutate: async (postId) => {
    //         debugger;
    //         await queryClient.cancelQueries({ queryKey: ['posts', { feed }] })
    //         const previousPosts = queryClient.getQueryData(['posts', { feed }])

    //         queryClient.setQueryData(['posts', { feed }], (data) => {
    //         debugger;

    //         return ({
    //             ...data, docs: data.docs.map(post => {
    //                 return post._id === postId
    //                     ? {
    //                         ...post,
    //                         likes: {
    //                             ...post.likes,
    //                             count: post.likes.count + 1,
    //                             isLikedByUser: true
    //                         }
    //                     }
    //                     : post
    //             })
    //         })})

    //         return { previousPosts }
    //       },
    //       onError: (err, postId, context) => {
    //         queryClient.setQueryData(['posts', { feed }], context.previousPosts);
    //         toast(toastError());
    //       },
    // })

    // const unlikeMutation = useMutation({
    //     mutationFn: (postId) => PostAPI.unlikePost(postId),
    //     onMutate: async (postId) => {
    //         await queryClient.cancelQueries({ queryKey: ['posts', { feed }] })
    //         const previousPosts = queryClient.getQueryData(['posts', { feed }])

    //         queryClient.setQueryData(['posts', { feed }], (data) => ({
    //             ...data, docs: data.docs.map(post => {
    //                 return post._id === postId
    //                     ? {
    //                         ...post,
    //                         likes: {
    //                             ...post.likes,
    //                             count: post.likes.count - 1,
    //                             isLikedByUser: false
    //                         }
    //                     }
    //                     : post
    //             })
    //         }))

    //         return { previousPosts }
    //       },
    //       onError: (err, postId, context) => {
    //         queryClient.setQueryData(['posts', { feed }], context.previousPosts);
    //         toast(toastError());
    //       },
    // })

    const likeMutation = useMutation({
        mutationFn: (postId) => PostAPI.likePost(postId),
        onMutate: async (postId) => {
          // queryClient.invalidateQueries(['posts']);
        },
        onError: (err, postId, context) => {
          toast(toastError());
        },
    })

    const unlikeMutation = useMutation({
        mutationFn: (postId) => PostAPI.unlikePost(postId),
        onMutate: async (postId) => {
          // queryClient.invalidateQueries(['posts']);
        },
        onError: (err, postId, context) => {
          toast(toastError());
        },
    })

    const queryObserver = useMemo(() => {
        return new QueryObserver(queryClient, {
            queryKey: ['posts', {deleted: true}],
            retry: 0,
            initialData: new Set(),
        })
    }, [queryClient])

    queryObserver.subscribe(({data}) => {
        if (data) setDeletedPosts(data);
    })

    if (isFetching && !isFetchingNextPage) {
        return (
          <Flex alignItems="center" justifyContent="center" w="100%" minH="100%">
            <Spinner
                thickness='4px'
                speed='0.5s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
            />
          </Flex>
        )
    }

    if (error) {
        return <span>Error: {error}</span>
    }

    if (!data.pages[0].totalDocs) {
       switch (feed) {
        case 'popular':
          return <PostsEmptyPlaceholder />
        case 'new':
          return <PostsEmptyPlaceholder />
        case 'draft':
          return <OwnPostsEmptyPlaceholder />
        case 'followed':
          return <FollowedEmptyPlaceholder />
        case 'bookmarks':
          return <BookmarksEmptyPlaceholder />
        default:
          break;
       }
    }

    return (
        <VStack as="ul" gap="50px" listStyleType="none">
            {data.pages.map(
                (page) => {
                  let posts = page.docs
                    .filter(post => (
                        post.title.toLowerCase().includes(searchQuery) ||
                        post.tags.map(t => t.toLowerCase()).includes(searchQuery)
                    ))
                    .filter(post => !deletedPosts.has(post._id))

                  if (!posts.length) {
                    return null
                  }

                  return (
                    <Box as="li" key={page.page} w="100%">
                        <PostCardList
                            posts={posts}
                            onLike={(postId) => likeMutation.mutate(postId)}
                            onUnlike={(postId) => unlikeMutation.mutate(postId)}
                        />
                        <div ref={scrollRef}></div>
                    </Box>
                )}
            )}
        </VStack>
    )
})
