import React from 'react'
import { Box, Flex, Tag } from '@chakra-ui/react';


export const PostTags = ({ tags }) => {
    return (
        <Box>
            <Flex wrap="wrap" gap="10px">
                {tags.map(tag => (
                    <Tag key={tag} variant="subtle" fontSize={13}>
                        {tag}
                    </Tag>
                ))}
            </Flex>
        </Box>
    )
}
