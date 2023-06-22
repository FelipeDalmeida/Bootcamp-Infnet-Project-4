import axios from "axios";
import { initialUser, useGlobalStore } from "../useGlobalStore";
import { browserHistory } from "../browserHistory";
import { AuthToken } from "../authToken";
import { Toast } from "../../components/Toast";
import toast from "react-simple-toasts";

const texts = {
  unauthenticatedError: "Sua sessão expirou. Por favor, faça login novamente.",
};

const setIsLoading = useGlobalStore.getState().setIsLoading;

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  setIsLoading(true);
  const token = AuthToken.get();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    setIsLoading(false);
    return response;
  },
  (error) => {
    setIsLoading(false);
    const status: number = error.request.status;
    if (status === 401) {
      AuthToken.remove();
      toast(<Toast message={texts.unauthenticatedError} />);
      browserHistory.push("/");
    } else if (status === 400) {
      const data = error.response.data;

      if (data.errors) {
        const errors: string[] = data.errors
          .map(({ constraints }: any) => Object.values(constraints))
          .flat();
        for (const error of errors) {
          toast(<Toast message={error} />);
        }
      } else if (data.message) {
        toast(<Toast message={data.message} />);
      }
    }
  }
);
