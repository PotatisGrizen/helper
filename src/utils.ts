export const timeout = (seconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, seconds * 1000);
  });
};
