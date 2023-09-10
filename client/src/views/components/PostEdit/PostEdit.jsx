import React, { useState } from 'react'
import { Box, Button, Editable, EditablePreview, EditableTextarea, Heading, Input, Text } from '@chakra-ui/react';

import cl from "./PostEdit.module.scss";


export const PostEdit = ({
    title: initialTitle,
    description: initialDescription,
    tags: initialTags,
    preview: initialPreview,
    editor,
    status,
    submitButton,
    onSubmit
}) => {
    const [title, setTitle] = useState(initialTitle);
    const [description, setDescription] = useState(initialDescription);
    const [tags, setTags] = useState(initialTags?.join(', ') || []);
    const [preview, setPreview] = useState(initialPreview);

    const onSubmitHandler = async () => {
        onSubmit({
            title, 
            description, 
            tags: tags.split(',').map(tag => tag.trim()), 
            preview
        });
    }

    return (
        <Box className={cl.card}>
            <Box className={cl.cardContainer} pt="16px" pb="32px">
                <Editable defaultValue={title} placeholder="Заголовок поста" pb="24px">
                    <Heading as="h1" size="lg">
                        <EditablePreview />
                    </Heading>
                    <EditableTextarea onChange={(e => setTitle(e.target.value))} fontSize="30px" fontWeight="700" lineHeight="1.2" />
                </Editable>
                <Editable defaultValue={description} placeholder="Описание поста" pb="16px">
                    <Text>
                        <EditablePreview />
                    </Text>
                    <EditableTextarea onChange={(e => setDescription(e.target.value))} minHeight="160px"/>
                </Editable>
                <input 
                    className={cl.tagsInput}
                    placeholder='Тег1, Тег2, Тег3, ...'
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                />
            </Box>
            <Box ml="-100px" className={cl.editorContainer}>
                { editor }
            </Box>
            <Box className={cl.cardActions}>
                <Box className={cl.cardContainer}>
                    <Button
                        isLoading={status === "loading"}
                        loadingText={submitButton.loadingText}
                        spinnerPlacement="end"
                        onClick={onSubmitHandler}
                    >
                        {submitButton.title}
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
