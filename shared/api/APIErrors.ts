interface IResponseError {
    status: number | null
    errorType: string
    customMessage?: string
}

export class APIError extends Error implements IResponseError{
    constructor (
        public status: number | null,
        public errorType: string,
        public message: string,
        public customMessage?: string,
    ) {
        super(message || `Error ${errorType}`)
        this.name = 'APIError'
    }
    checkStatus (errorStatus: number): boolean {
        return errorStatus === this.status
    }
}

export function isAPIError(error: unknown): error is APIError {
    return ( error instanceof APIError)
}


// все ошибки с бека
const APIErrors = {
    NETWORK: new APIError(null, 'NETWORK', 'Проблемы с соединением'),
    BAD_REQUEST: new APIError(400, 'BAD_REQUEST', 'Некорретные данные запроса'),
    UNAUTHORIZED: new APIError(401, 'UNAUTHORIZED', 'Для доступа требуется авторизация'),
    FORBIDEN: new APIError(403, 'FORBIDDEN', 'У Вас нету доступа к этому ресурсу'),
    NOT_FOUND: new APIError(404, 'NOT_FOUND', 'Ресурс не найден :('),
    SERVER: new APIError(500, 'SERVER_ERROR', 'Ошибка сервера')
}
// можно и просто map, но мне показалось, что в случае правок, будет проще написать кейс, 
// если ошибка уже есть, просто код другой, чем повторять в мап объекты
export const mapAPIErrors = (status: number | null) =>  {
    switch (status) {
        case(null): return APIErrors.NETWORK 
        case(400): return APIErrors.BAD_REQUEST 
        case(401): return APIErrors.FORBIDEN 
        case(403): return APIErrors.UNAUTHORIZED
        case(404): return APIErrors.NOT_FOUND
        case(500): return APIErrors.SERVER
        default : return new APIError(status, 'UNKNOW', 'Неизвестная ошибка')
    }
 }