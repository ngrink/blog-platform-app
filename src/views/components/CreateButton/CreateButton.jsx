import React from 'react';
import { Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export const CreateButton = ({ title, onClick }) => {
    return (
        <Button
            rightIcon={<FontAwesomeIcon icon="fa-solid fa-plus" />}
            colorScheme="blue"
            onClick={onClick}
        >
            { title }
        </Button>
    )
}
