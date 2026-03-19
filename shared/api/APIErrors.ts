interface IResponseError {
    status: number
    errorType: string
    message?: string
}

export class APIError extends Error implements IResponseError{
    constructor (
        public status: number,
        public errorType: string,
        public message: string
    ) {
        super(message || `Error ${errorType}`)
        this.name = 'APIError'
    }
}

// все ошибки с бека
const APIErrors = {
    NETWORK: new APIError(400, 'NETWORK_ERROR', 'Некорретные данные запроса'),
    UNAUTHORIZED: new APIError(401, 'NETWORK_ERROR', 'Для доступа требуется авторизация'),
    FORBIDEN: new APIError(403, 'FORBIDDEN', 'У Вас нету доступа к этому ресурсу'),
    NOT_FOUND: new APIError(404, 'NOT_FOUND', 'Ресурс не найден :('),
    SERVER: new APIError(500, 'SERVER_ERRPR', 'Ошибка сервера')
}

// можно и просто map, но мне показалось, что в случае правок, будет проще написать кейс, 
// если ошибка уже есть, просто код другой, чем повторять в мап объекты
export const mapAPIErrors = (status: number) =>  {
    switch (status) {
        case(400): return APIErrors.NETWORK 
        case(401): return APIErrors.FORBIDEN 
        case(403): return APIErrors.UNAUTHORIZED
        case(404): return APIErrors.NOT_FOUND
        case(500): return APIErrors.SERVER
        default : return new APIError(status, 'UNKNOW', 'Неизвестная ошибка')
    }
 }