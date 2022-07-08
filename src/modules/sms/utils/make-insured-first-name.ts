export const makeInsuredFirstName = (insuredName: string) => {
  return insuredName.trim().split(' ')[0];
};
