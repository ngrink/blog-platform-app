import React, { useCallback, useMemo, useRef } from 'react'
import { useParams } from 'react-router-dom';
import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';
import { Spinner, useToast } from '@chakra-ui/react';
import { createReactEditorJS } from 'react-editor-js';

import { PostAPI } from '../../../modules/posts';
import { PostEdit } from '../../components/PostEdit';

import { EDITOR_JS_TOOLS } from '../../../utils/libs/editorjs';
import { toastInfo, toastError, toastSuccess } from '../../../utils/helpers/toasts';


export const PostEditContainer = () => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const { postId } = useParams();

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

            toast(toastInfo({title: "Сохранение поста..."}));

            return { previousData }
          },
          onError: (err, {postId}, context) => {
            queryClient.setQueryData(['posts', postId], context.previousData);
            toast(toastError({title: "Пост не сохранен"}));
          },
          onSuccess: () => {
            toast.closeAll();
            setTimeout(() => {
                toast(toastSuccess({title: "Пост сохранен", duration: 1000}));
            }, 500);
          }
    })

    const editorInstance = useRef(null);

    const ReactEditorJS = useMemo(() => {
        return createReactEditorJS()
    }, [])

    const handleInitialize = useCallback((instance) => {
        editorInstance.current = instance
    }, [])

    const handleData = useCallback(async () => {
        const data = await editorInstance.current.save();
        return data;
    }, [])


    const onSubmit = async (data) => {
        const content = await handleData();
        updatePost.mutate({postId, data: {content, ...data}});
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
            editor={
                <ReactEditorJS
                    onInitialize={handleInitialize}
                    tools={EDITOR_JS_TOOLS}
                    defaultValue={data.content}
                />
            }
            status={updatePost.status}
            onSubmit={onSubmit}
        />
    )
}
