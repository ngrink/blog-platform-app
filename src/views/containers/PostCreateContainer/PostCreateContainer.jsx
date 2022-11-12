import React from 'react'
import { useToast } from '@chakra-ui/react';
import { useMutation } from '@tanstack/react-query';

import { PostEdit } from '../../components/PostEdit';
import { PostAPI } from '../../../modules/posts';
import { useEditor } from '../../../utils/hooks/useEditor';
import { toastError, toastInfo, toastSuccess } from '../../../utils/helpers/toasts';



export const PostCreateContainer = () => {
    const editor = useEditor();
    const toast = useToast();

    const createPost = useMutation((data) => PostAPI.createPost(data), {
        onMutate: () => {
            toast(toastInfo({title: "Создание поста..."}));
        },
        onError: () => {
            toast(toastError({title: "Пост не создан"}));
        },
        onSuccess: () => {
            toast.closeAll();
            setTimeout(() => {
                toast(toastSuccess({title: "Пост создан", duration: 1000}));
            }, 500);
        },
    });

    const onSubmit = async (data) => {
        const content = await editor.getData();
        createPost.mutate({...data, content});
    }

    return (
        <PostEdit
            editor={editor.element}
            status={createPost.status}
            submitButton={{title: "Создать пост", loadingText: "Создание..."}}
            onSubmit={onSubmit}
        />
    )
}
