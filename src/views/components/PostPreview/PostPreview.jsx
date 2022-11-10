import React from 'react'
import { Box, AspectRatio, Image } from '@chakra-ui/react';


export const PostPreview = ({ preview }) => {
    return (
        <Box w="100%">
            <AspectRatio ratio={16 / 9}>
                <Image src={preview} objectFit="cover"/>
            </AspectRatio>
        </Box>
    )
}
