import React, { useCallback, useState } from 'react'
import { Box, useToast } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDropzone } from 'react-dropzone'
import cn from 'classnames';

import { toastError } from '../../../utils/helpers/toasts';
import cl from "./ImageDropzone.module.scss";


export const ImageDropzone = ({ onChange, initialImage }) => {
  const [image, setImage] = useState(initialImage);
  const toast = useToast();

  const onDrop = useCallback(files => {
      if (files.length > 1) {
        toast(toastError({title: "Слишком много файлов", description: "Только один файл разрешен"}));
        return;
      }

      const image = files[0];
      setImage(URL.createObjectURL(image))
      onChange(image);
  }, [onChange, toast])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: {'image/*': []},
    onDrop
  })

  return (
    <Box {...getRootProps({
      className: cn({
        [cl.dropzone]: true,
        [cl.dropzoneActive]: isDragActive
      })
    })}>
      <input {...getInputProps()} />
      <Box className={cl.dropzoneContent}>
        <DropzoneOverlay isShowIcon={!image}/>
        <DropzoneBackground image={image} />
        <DropzoneRemoveImageBtn 
          isShow={!!image} 
          onRemove={() => {
            setImage(null);
            onChange(null);
          }}
        />
      </Box>
    </Box>
  )
}

const DropzoneOverlay = ({ isShowIcon }) => {
  return (
    <Box className={cl.dropzoneOverlay}>
      {isShowIcon && <FontAwesomeIcon className={cl.dropzoneIcon} icon="fa-solid fa-image"/> }
    </Box>
  )
}

const DropzoneBackground = ({ image }) => {
  return (
    <Box 
      className={cl.dropzoneBackground} 
      background={image && `url('${image}')`}>
    </Box>
  )
}

const DropzoneRemoveImageBtn = ({ isShow, onRemove }) => {
  if (!isShow) {
    return null;
  }

  return (
    <Box className={cl.removeImageBtn} onClick={(e) => {
      e.stopPropagation();
      onRemove();
    }}>
      <FontAwesomeIcon icon="fa-solid fa-xmark"/>
    </Box>
   )
}
