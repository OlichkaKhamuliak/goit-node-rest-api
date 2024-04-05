export const handleAsync = async (fn) => {
  try {
    return await fn();
  } catch (error) {
    throw error;
  }
};
