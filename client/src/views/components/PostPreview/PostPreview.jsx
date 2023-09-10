import React from 'react'
import { Box, AspectRatio, Image } from '@chakra-ui/react';

import { resolveURL } from '../../../utils/helpers/resolveURL';
import fallback from "../../../assets/img/img-placeholder.jpeg";


export const PostPreview = ({ preview }) => {
    return (
        <Box w="100%">
            <AspectRatio ratio={16 / 9}>
                <Image src={resolveURL(preview)} onError={(e)=>{ e.target.onError = null; e.target.src = fallback }} objectFit="cover" />
            </AspectRatio>
        </Box>
    )
}
