const ApiUrl = "https://hrinformationsystem.com:3001/api";
const PayslipFileUrl = "https://hrinformationsystem.com:3001/payslip/";
const AlertOptions = {
  position: "bottom-right",
  effect: "slide",
  timeout: 3000
};
const JsonContentType = {
  headers: {
    "Content-Type": "application/json"
  }
};

export { ApiUrl, PayslipFileUrl, AlertOptions, JsonContentType };
