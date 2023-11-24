import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getChatId(id1: string, id2: string) {
  const id = [id1, id2].sort();
  return `${id[0]}--${id[1]}`;
}

export const toPusherKey = (key: string) => key.replace(/:/g, "__");
