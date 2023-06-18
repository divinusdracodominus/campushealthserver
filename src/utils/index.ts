export interface Result {
    status: number,
    message: string,
    data: [],
}

export const STATUS_OK = 1;
export const STATUS_FAILURE = 2;