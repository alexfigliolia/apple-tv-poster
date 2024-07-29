import { useMemo } from "react";

export const useClassNames = (
  className: string,
  ...rest: (string | undefined)[]
) => {
  return useMemo(() => {
    const list: string[] = [className];
    for (const str of rest) {
      if (str && typeof str === "string") {
        list.push(str);
      }
    }
    return list.join(" ");
  }, [className, rest]);
};
