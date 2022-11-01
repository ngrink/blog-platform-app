import React from 'react'
import { HStack, Avatar as AvatarChakra } from '@chakra-ui/react';

import cl from "./UserAvatar.module.scss";



export const UserAvatar = ({ src, name, subtitle, spacing }) => {
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
                subtitle={subtitle}
            />
        </HStack>
    </div>
  )
}

export const AvatarDetails = ({ name, subtitle }) => {
    if (!name && !subtitle) return null;

    return (
        <div>
            {name &&
                <div className={cl.name}>
                    {name}
                </div>
            }
            {subtitle &&
                <div className={cl.subtitle}>
                    {subtitle}
                </div>
            }
        </div>
    )
}
