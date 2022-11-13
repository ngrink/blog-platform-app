import React, { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useToast } from '@chakra-ui/react'

import { PostAPI } from '../../../modules/posts'
import { PostMenu } from '../../components/PostMenu/PostMenu'
import { toastError, toastInfo, toastSuccess } from '../../../utils/helpers/toasts'


export const PostMenuContainer = ({ postId, isPostOwnedByUser, isPublished }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const toast = useToast();

    const deletePost = useMutation({
        mutationFn: (postId) => PostAPI.deletePost(postId),
        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ['posts', postId] })

            const previousPost = await queryClient.getQueryData(['posts', postId]);
            queryClient.removeQueries({ queryKey: ['posts', postId] })

            queryClient.setQueryData(['posts', {deleted: true}], (deletedPosts) => {
                return new Set([...deletedPosts, postId]);
            })

            toast(toastInfo({title: "Удаление поста..."}));

            return { previousPost }
          },
          onError: (err, postId, context) => {
            queryClient.setQueryData(['posts', postId], context.previousPost);
            queryClient.setQueryData(['posts', {deleted: true}], (deletedPosts) => {
                deletedPosts.delete(postId)
                return new Set(deletedPosts);
            })
            toast(toastError({title: "Пост не удален"}));
          },
          onSuccess: () => {
            toast.closeAll();
            setTimeout(() => {
                toast(toastSuccess({title: "Пост удален", duration: 1000}));
                if (location.pathname !== "/") navigate(-1);
            }, 500);
          }
    })

    const publishPost = useMutation((postId) => PostAPI.publishPost(postId), {
        onMutate: () => {
            toast(toastInfo({title: "Публикация поста..."}));
          },
        onError: () => {
            toast(toastError({title: "Пост не опубликован"}));
        },
        onSuccess: () => {
            toast.closeAll();
            setTimeout(() => {
                toast(toastSuccess({title: "Опубликовано", duration: 1000}));
            }, 500);
        }
    })

    const onDeletePost = useCallback(() => {
        deletePost.mutate(postId);
    }, [deletePost, postId])

    const onPublishPost = useCallback(() => {
        publishPost.mutate(postId);
    }, [publishPost, postId])

    return (
        <PostMenu
            postId={postId}
            isPostOwnedByUser={isPostOwnedByUser}
            isPublished={isPublished}
            onDeletePost={onDeletePost}
            onPublishPost={onPublishPost}
        />
    )
}
