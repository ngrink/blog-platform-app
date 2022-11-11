import React from 'react'
import { Box, IconButton, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';


export const PostMenu = ({
    postId,
    isPostOwnedByUser,
    onDeletePost
}) => {
    return (
        <Box>
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
                            <Link to={`/posts/${postId}/edit`}>
                                <MenuItem icon={<FontAwesomeIcon icon="fa-solid fa-pen-to-square" />}>
                                    Редактировать статью
                                </MenuItem>
                            </Link>
                            <MenuItem
                                icon={<FontAwesomeIcon icon="fa-solid fa-trash" />} color="#cb3434"
                                onClick={onDeletePost}
                            >
                                Удалить статью
                            </MenuItem>
                        </>
                    }
                </MenuList>
            </Menu>
        </Box>
    )
}
