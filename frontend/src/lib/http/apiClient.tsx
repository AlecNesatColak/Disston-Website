import { ApiError } from "@/models/interfaces/ApiError";
import axios, {AxiosError} from "axios";
import qs from "qs";

export const api = axios.create({
    baseURL: process.env.API_BASE_URL ?? "http://localhost:8000",
    timeout: 12000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
    paramsSerializer: {
        serialize: (p) => qs.stringify(p, { arrayFormat: "repeat" }) },
        transitional: {
            clarifyTimeoutError: true 
        }
});

api.interceptors.response.use(
    (res) => res,
    (error: AxiosError<any>) => {
        const status = error.response?.status ?? (error.code === "ECONNABORTED" ? 408 : 0);
        const data = error.response?.data;
        const normalized: ApiError = {
            status,
            code: data?.code ?? error.code,
            message: data?.message ?? data?.detail ?? (status === 408 ? "Request timeout" : error.message || "Network Error"),
            details: data,
        };
        return Promise.reject(normalized);
    }
);


// tiny GET-only backoff

export async function withRetry<T>(
    fn: (signal: AbortSignal) => Promise<T>,
    attempts = 3,
    baseMs = 400
): Promise<T> {
    const abortController = new AbortController();
    let lastError: ApiError | undefined;
    for (let i = 0; i < attempts; i++) {
        try {
            return await fn(abortController.signal);
        } catch (e: any) {
            lastError = e as ApiError;
            if (![0, 408, 429, 500, 502, 503, 504].includes(lastError.status) || i === attempts - 1) throw lastError;
            const wait = baseMs * 2 ** i + Math.random() * 100;
            await new Promise((r) => setTimeout(r, wait));
        }
    }
    throw lastError;
}

