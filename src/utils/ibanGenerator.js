const generateTRIBAN = accountNumber => {
  const TR_COUNTRY_CODE = 'TR';
  const TR_IBAN_CHECK_DIGIT_VALUE = '68';
  const bankCode = '0001';
  const branchCode = '0019';
  const accountNo = accountNumber;
  const trIban = `${TR_COUNTRY_CODE}${TR_IBAN_CHECK_DIGIT_VALUE}${bankCode}${branchCode}${accountNo}`;
  return trIban;
};

export default generateTRIBAN;
