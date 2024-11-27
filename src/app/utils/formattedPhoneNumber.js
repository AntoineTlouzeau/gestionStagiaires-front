export function formatPhoneNumber(phoneNumber) {
  // Check if the phone number is already in the correct format
  if (phoneNumber.length === 10) {
    return `${phoneNumber.substr(0, 2)}.${phoneNumber.substr(
      2,
      2
    )}.${phoneNumber.substr(4, 2)}.${phoneNumber.substr(
      6,
      2
    )}.${phoneNumber.substr(8)}`;
  }

  return ("Ne semble pas être un numéro de téléphone valide");
}
