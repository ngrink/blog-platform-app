import React from 'react'
import { HStack, Avatar as AvatarChakra, Flex, Box } from '@chakra-ui/react';

import cl from "./UserAvatar.module.scss";



export const UserAvatar = ({ src, name, subtitle, username }) => {
  return (
    <div className={cl.avatarContainer} >
        <HStack gap="5px">
            <AvatarChakra
                src={src}
                name={name}
                size="md"
            />
            <AvatarDetails
                name={name}
                username={username}
                subtitle={subtitle}
            />
        </HStack>
    </div>
  )
}

export const AvatarDetails = ({ name, subtitle, username }) => {
    if (!name && !subtitle) return null;

    return (
        <div>
            <HStack gap="0px" alignItems="center" pb="5px">
                {name &&
                    <div className={cl.name}>
                        {name}
                    </div>
                }
                {username &&
                    <Box className={cl.username} mb="-2px">
                        @{username}
                    </Box>
                }
            </HStack>
            <Box>
                {subtitle &&
                    <div className={cl.subtitle}>
                        {subtitle}
                    </div>
                }
            </Box>
        </div>
    )
}
