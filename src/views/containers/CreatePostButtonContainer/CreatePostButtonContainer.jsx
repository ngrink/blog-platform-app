import React from 'react'
import { useNavigate } from 'react-router-dom'

import { CreateButton } from "../../components/CreateButton"


export const CreatePostButtonContainer = () => {
    const navigate = useNavigate();

    const onClick = () => {
        navigate("/posts/new")
    };

    return (
        <CreateButton
            title="Создать"
            onClick={onClick}
        />
    )
}
