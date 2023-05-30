import { FileInterface } from "@/types";

export function emailValidation(email: string) {
  const expression = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i;
  return expression.test(email);
}

export function validatePassword(password: string) {
  if (password.length === 0) {
    return false;
  }
  if (password.length < 6) {
    return false;
  }
  if (/^[a-zA-Z0-9]+$/.test(password)) {
    return false;
  }
  return true;
}

export function defaultSortPredicate<T>(a: T, b: T) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}

export function sortArrayWithPredicate<T extends Record<string, any>>(
  arr: T[],
  type: "asc" | "desc",
  predicate: (a: T, b: T) => number
) {
  const sorted = arr
    ?.slice()
    .sort((a, b) => (type === "asc" ? predicate(a, b) : predicate(b, a)));
  return sorted;
}

export function sortArrayByProperty<T extends Record<string, any>>(
  arr: T[],
  property: keyof T,
  type: "asc" | "desc"
) {
  return sortArrayWithPredicate(arr, type, (a, b) =>
    defaultSortPredicate(a[property], b[property])
  );
}

export function searchByName(name: string, files: FileInterface[]) {
  const filteredList = files?.filter((file: FileInterface) => {
    return file.name.toLowerCase().includes(name.toLowerCase());
  });
  return filteredList;
}
