import React from 'react'

import { PostComments } from '../../components/PostComments/PostComments'
import { PostAPI } from '../../../modules/posts'
import { useToast } from '@chakra-ui/react'
import { toastError, toastSuccess } from '../../../utils/helpers/toasts'


export const PostCommentsContainer = ({
  postId,
  comments
}) => {
  const toast = useToast();

  const onCreateComment = async (comment) => {
    try {
      await PostAPI.createPostComment(postId, {comment})
      toast(toastSuccess({title: "Комментарий добавлен"}));
    } catch (e) {
      toast(toastError({title: "Комментарий не добавлен"}));
    }
  }

  return (
    <PostComments
      postId={postId}
      comments={comments}
      onCreateComment={onCreateComment}
    />
  )
}
