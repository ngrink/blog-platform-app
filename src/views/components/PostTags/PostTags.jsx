import React from 'react'
import { Box, Flex, Tag } from '@chakra-ui/react';
import { Link } from 'react-router-dom';


export const PostTags = ({ tags }) => {
    return (
        <Box>
            <Flex wrap="wrap" gap="10px">
                {tags.map(tag => (
                    <Link key={tag} to={`?search=${tag}`}>
                      <Tag variant="subtle" fontSize={13}>
                        {tag}
                      </Tag>
                    </Link>
                ))}
            </Flex>
        </Box>
    )
}
