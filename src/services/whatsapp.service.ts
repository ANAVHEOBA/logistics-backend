import { config } from "../config/environment";

class WhatsAppService {
  static async sendOTP(to: string, otp: string) {
    const urlencoded = new URLSearchParams();
    urlencoded.append("token", config.kudismsAPIkey);
    urlencoded.append("template_code", config.kudismsWhatsAppTemplate);
    urlencoded.append("button_parameters", "xxxx,xxxx");
    urlencoded.append("header_parameters", "xxxx,xxxx");
    urlencoded.append("recipient", to);
    urlencoded.append("parameters", otp);
    const requestOptions: RequestInit = {
      method: "POST",
      body: urlencoded,
      redirect: "follow",
    };
    await fetch(config.kudismsWhatsAppURL, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  }
}

export const sendWhatsAppOTP = WhatsAppService.sendOTP;
