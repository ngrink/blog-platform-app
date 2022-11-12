import React from 'react'
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Spinner, useToast } from '@chakra-ui/react';

import { PostEdit } from '../../components/PostEdit';
import { PostAPI } from '../../../modules/posts';
import { useEditor } from '../../../utils/hooks/useEditor';
import { toastInfo, toastError, toastSuccess } from '../../../utils/helpers/toasts';


export const PostEditContainer = () => {
    const { postId } = useParams();
    const queryClient = useQueryClient();
    const toast = useToast();

    const { isLoading, error, data } = useQuery(
        ['posts', postId],
        () => PostAPI.getPost(postId),
        {
            placeholderData: () => {
                return queryClient
                    .getQueryData(["posts"])
                    ?.find(post => post._id === postId)
            }
        }
    )

    const updatePost = useMutation({
        mutationFn: ({postId, data}) => PostAPI.updatePost(postId, data),
        onMutate: async ({postId, data}) => {
            await queryClient.cancelQueries({ queryKey: ['posts', postId] })
            const previousData = queryClient.getQueryData(['posts', postId])

            queryClient.setQueryData(['posts', postId], (post) => ({
                ...post,
                title: data.title,
                description: data.description,
                tags: data.tags,
                content: data.content,
                preview: data.preiew,
            }))

            toast(toastInfo({title: "Обновление поста..."}));

            return { previousData }
          },
          onError: (err, {postId}, context) => {
            queryClient.setQueryData(['posts', postId], context.previousData);
            toast(toastError({title: "Пост не обновлен"}));
          },
          onSuccess: () => {
            toast.closeAll();
            setTimeout(() => {
                toast(toastSuccess({title: "Пост обновлен", duration: 1000}));
            }, 500);
          }
    })

    const editor = useEditor(data?.content);

    const onSubmit = async (data) => {
        const content = await editor.getData();
        updatePost.mutate({postId, data: {...data, content}});
    }

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
        <PostEdit
            {...data}
            editor={editor.element}
            status={updatePost.status}
            submitButton={{title: "Обновить пост", loadingText: "Обновление..."}}
            onSubmit={onSubmit}
        />
    )
}
