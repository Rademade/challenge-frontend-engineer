export const RULE = {
  OneLetter: /[A-Za-z_]/g,
  UpperAndLower: /(.*[a-z].*[A-Z])|(.*[A-Z].*[a-z])/g,
  OneNumber: /.*\d/g,
  SpecialSymbol: /(?=.*[^\w\s]|_|[ ])/g,
  LongerThan4: /.{5}/g,
  LongerThan8: /.{9}/g,
  LongerThan12: /.{13,}/g,
};

export const RulesErrorLexicon = {
  OneLetter: "OneLetter",
  UpperAndLower: "UpperAndLower",
  OneNumber: "OneNumber",
  SpecialSymbol: "SpecialSymbol",
  LongerThan4: "LongerThan4",
  LongerThan8: "LongerThan8",
  LongerThan12: "LongerThan12",
};

export default { RULE, RulesErrorLexicon };
