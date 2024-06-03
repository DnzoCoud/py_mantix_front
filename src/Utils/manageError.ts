

export const fetchErrors = (error: any) : string => {
    let messageError:string = error.message
    switch (error.response.status){
        case 404:
            messageError = "Recurso no encontrado, comuniquese con un administrador"
            break
        case 500:
            messageError = "Error interno de servidor, comuniquese con un administradoer"
            break
    }

    return messageError
}