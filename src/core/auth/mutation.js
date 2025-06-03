import { useMutation } from "@tanstack/react-query";
import { loginAction, updateUser } from "./action";
import { message } from "antd";
import { useNavigate } from "react-router-dom";

export function useLoginMutation() {
  const nvigate = useNavigate();
  return useMutation({
    mutationFn: (data) => loginAction(data),
    onMutate: () => {
      message.loading({ content: "Loading...", key: "login" });
    },
    onError: (error) => {
      message.error({ content: error.response.data.message, key: "login" });
    },
    onSuccess: () => {
      message.success({
        content: "Welcome to Administrative Dashboard!",
        key: "login",
      });
    },
    onSettled: (val) => {
      localStorage.setItem("isLoggedIn", JSON.stringify(val.data));
      nvigate("/dashboard");
    },
  });
} // useLoginMutation

export function useUpdateUser() {
  return useMutation({
    mutationFn: (data) => updateUser(data),
  });
}
