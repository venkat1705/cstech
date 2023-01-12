import { atom } from "recoil";

export const login = atom({
  key: "login",
  default: JSON.parse(localStorage.getItem("user")),
});

export const user = atom({
  key: "user",
  default: "",
});
