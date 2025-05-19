export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOTPExpiry = (): Date => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 30); // OTP expires in 30 minutes
  return expiryDate;
}; 