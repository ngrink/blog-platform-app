export const toastInfo = (options) => ({
    title: options?.title,
    description: options?.description,
    duration: options?.duration || 3500,
    position: options?.position || 'bottom-right',
    isClosable: options?.isClosable || true,
    status: 'info',
})

export const toastWarning = (options) => ({
    title: options?.title,
    description: options?.description,
    duration: options?.duration || 3500,
    position: options?.position || 'bottom-right',
    isClosable: options?.isClosable || true,
    status: 'warning',
})

export const toastSuccess = (options) => ({
    title: options?.title || "Запрос выполнился успешно",
    description: options?.description,
    duration: options?.duration || 3500,
    position: options?.position || 'bottom-right',
    isClosable: options?.isClosable || true,
    status: 'success',
})

export const toastError = (options) => ({
    title: options?.title || "Запрос не выполнен",
    description: options?.description || (!options.title && "Попробуйте еще раз позже"),
    duration: options?.duration || 3500,
    position: options?.position || 'bottom-right',
    isClosable: options?.isClosable || true,
    status: 'error',
})

export const toastLoading = (options) => ({
    title: options?.title || "Загрузка...",
    description: options?.description,
    duration: options?.duration || 3500,
    position: options?.position || 'bottom-right',
    isClosable: options?.isClosable || true,
    status: 'loading',
})
