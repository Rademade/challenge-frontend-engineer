export const RULE = {
  OneLetter: /./g,
  UpperAndLower: /.*[a-z].*[A-Z]/g,
  OneNumber: /.*\d/g,
  SpecialSymbol: /(?=.*[^\w\s])/g,
  LongerThan4: /.{5}/g,
  LongerThan8: /.{9}/g,
  LongerThan12: /.{13,}/g,
};

export const RulesErrorLexicon = {
  Default: 'all rules failed',

  OneLetter: 'OneLetter',
  UpperAndLower: 'UpperAndLower',
  OneNumber: 'OneNumber',
  SpecialSymbol: 'SpecialSymbol',
  LongerThan4: 'LongerThan4',
  LongerThan8: 'LongerThan8',
  LongerThan12: 'LongerThan12',

  Exact: 'all rules satisfied',
}

export default { RULE, RulesErrorLexicon };