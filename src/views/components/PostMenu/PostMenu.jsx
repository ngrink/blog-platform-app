import React, { useState } from 'react'
import { Box, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export const PostMenu = ({
    postId,
    isPostOwnedByUser,
    isPublished,
    isBookmarked: initialIsBookmarked,
    onDeletePost,
    onPublishPost,
    onBookmarkPost,
    onUnbookmarkPost,
}) => {
    const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);

    return (
        <Box>
            <IconButton
                variant="ghost"
                cursor="pointer"
                icon={isBookmarked
                    ? <FontAwesomeIcon icon="fa-solid fa-bookmark" color="red" />
                    : <FontAwesomeIcon icon="fa-regular fa-bookmark" />
                }
                onClick={isBookmarked
                    ? () => {onUnbookmarkPost(); setIsBookmarked(false)}
                    : () => {onBookmarkPost(); setIsBookmarked(true)}
                }
            />
            <Menu>
                <MenuButton
                    as={IconButton}
                    aria-label='Options'
                    icon={<FontAwesomeIcon icon="fa-solid fa-ellipsis-vertical" />}
                    variant='ghost'
                />
                <MenuList>
                    {isPostOwnedByUser &&
                        <>
                            {!isPublished &&
                                <MenuItem
                                    icon={<FontAwesomeIcon icon="fa-solid fa-paper-plane" />}
                                    onClick={onPublishPost}
                                >
                                    Опубликовать
                                </MenuItem>
                            }
                            <Link to={`/posts/${postId}/edit`}>
                                <MenuItem icon={<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />}>
                                    Редактировать
                                </MenuItem>
                            </Link>
                            <MenuItem
                                icon={<FontAwesomeIcon icon="fa-solid fa-trash" />} color="#cb3434"
                                onClick={onDeletePost}
                            >
                                Удалить
                            </MenuItem>
                        </>
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}
