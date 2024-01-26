export const validateTextInput = (str: string) => {
  const regex = /^[а-яА-ЯёЁ-]{1,25}$/;
  return !regex.test(str);
};
