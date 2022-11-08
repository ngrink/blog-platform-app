export function connectionErrorToast(toast) {
  return toast({
        title: 'Server does not respond',
        description: "We're working on this situation",
        status: 'warning',
        duration: 7000,
        isClosable: true,
        position: 'bottom-right'
    })
}
