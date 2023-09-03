import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Box, Button, HStack, IconButton, Menu, MenuButton, MenuItem, MenuList, Spacer, Text, Textarea, VStack, useToast } from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import cl from "./PostComments.module.scss";
import { UserAvatar } from '../UserAvatar';
import { PostAPI } from '../../../modules/posts';
import { toastError, toastSuccess } from '../../../utils/helpers/toasts';
import { useAuth } from '../../../modules/auth';
import { useLocation } from 'react-router-dom';


export const PostComments = ({
  postId,
  comments,
  onCreateComment
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const commentsRef = useRef(null);
  const location = useLocation();
  const hash = location.hash;

  useEffect(() => {
    if (hash === "#comments") {
      commentsRef.current.scrollIntoView();
    }
  }, [hash])

  return (
    <>
      <Box ref={commentsRef} className={cl.postComments}>
        <HStack gap={2} mb={8}>
          <Text fontSize="3xl" fontWeight={700} >Комментарии</Text>
          <Spacer />
          <IconButton
            icon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
            onClick={onOpen}
          />
        </HStack>
        <CommentList postId={postId} comments={comments.items} />
      </Box>
      <AddCommentModal isOpen={isOpen} onClose={onClose} onCreateComment={onCreateComment} />
    </>
  )
}


const CommentList = ({
  postId,
  comments
}) => {
  const { auth } = useAuth();

  return (
    <VStack alignItems="flex-start" gap={3}>
      {comments.length
        ? comments.map(comment => (
          <Comment
            key={comment._id}
            userId={auth.accountId}
            postId={postId}
            commentId={comment._id}
            commentAuthorId={comment.author._id}
            username={comment.author.username}
            name={comment.author.profile.fullname}
            avatar={comment.author.profile.avatar}
            text={comment.comment}
            createdAt={comment.createdAt}

          />
        ))
        : <Text fontStyle="italic" color="#888">Здесь пока нет ни одного комментария, вы можете стать первым!</Text>
      }
    </VStack>
  );
}

const Comment = ({
  userId,
  postId,
  commentAuthorId,
  commentId,
  name,
  username,
  avatar,
  text,
  createdAt,
}) => {
  return (
    <VStack alignItems="start" w="full" className={cl.comment}>
      <HStack w="full">
        <UserAvatar
          name={name}
          username={username}
          src={avatar}
          subtitle={moment(createdAt).fromNow()}
          avatarSize="sm"
        />
        <Spacer />
        <CommentMenuContainer
          userId={userId}
          commentAuthorId={commentAuthorId}
          postId={postId}
          commentId={commentId}
        />
      </HStack>
      <Box>
        <Text>{text}</Text>
      </Box>
    </VStack>
  )
}

const CommentMenuContainer = ({
  userId,
  commentAuthorId,
  postId,
  commentId
}) => {
  const toast = useToast();

  const onDeleteComment = async (postId, commentId) => {
    try {
      await PostAPI.deletePostComment(postId, commentId);
      toast(toastSuccess({title: "Комментарий удален"}));
    } catch (e) {
      toast(toastError({title: "Комментарий не удален"}));
    }
  }

  return (
    <CommentMenu
      userId={userId}
      commentAuthorId={commentAuthorId}
      postId={postId}
      commentId={commentId}
      onDeleteComment={onDeleteComment}
    />
  )
}

const CommentMenu = ({
  userId,
  commentAuthorId,
  postId,
  commentId,
  onDeleteComment
}) => {
  if (userId !== commentAuthorId) {
    return null
  }

  return (
    <Menu>
      <MenuButton
          className={cl.commentMenuButton}
          as={IconButton}
          aria-label='Options'
          icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />}
          variant='ghost'
      />
      <MenuList>
        <MenuItem
          icon={<FontAwesomeIcon icon="fa-solid fa-trash" />}
          color="red.500"
          onClick={() => onDeleteComment(postId, commentId)}
        >
          Удалить комментарий
        </MenuItem>
      </MenuList>
    </Menu>
  )
}

const AddCommentModal = ({
  isOpen,
  onClose,
  onCreateComment
}) => {
  const [comment,  setComment] = useState("");

  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent color="#333">
          <ModalHeader>Добавить комментарий</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder='Текст комментария...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}/>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                variant='ghost'
                onClick={() => {
                  onClose();
                  setComment("");
                }}>
                  Отмена
                </Button>
              <Button
                colorScheme='teal'
                mr={3}
                onClick={() => {
                  onCreateComment(comment);
                  onClose();
                  setComment("");
                }}
              >
                Добавить
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
