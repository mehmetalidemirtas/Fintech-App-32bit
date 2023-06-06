export const formatPhoneNumber = phoneInput => {
  const cleanedNumber = phoneInput.replace(/\D/g, '');
  const match = cleanedNumber.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (cleanedNumber.length > 0 && cleanedNumber.charAt(0) !== '5') {
    return {
      showAlert: true,
      phoneNumber: '',
      phone: '',
    };
  }

  if (match) {
    const formattedText = `(${match[1]}) ${match[2]} ${match[3]}`;
    const phone = `+90${phoneInput}`;

    return {
      showAlert: false,
      phoneNumber: formattedText,
      phone: phone,
    };
  } else {
    return {
      showAlert: false,
      phoneNumber: cleanedNumber,
      phone: '',
    };
  }
};
