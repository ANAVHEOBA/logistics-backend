export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const getOTPExpiry = (): Date => {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 10); // OTP expires in 10 minutes
  return expiryDate;
}; 