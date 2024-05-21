import { useTypedSelector } from "./redux";

export function useAuth() {
  const { email, id } = useTypedSelector((state) => state.user);

  return {
    isAuth: !!email,
    email,
    id,
  };
}
