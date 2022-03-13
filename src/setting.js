const ApiUrl = "https://hrinformationsystem.com/api";
const PayslipFileUrl = "https://hrinformationsystem.com/payslip/";
const SurveyPhotoUrl = "https://hrinformationsystem.com/files-survey/";
const IdeaboxFileUrl = "https://hrinformationsystem.com/files-ideabox/";

const AlertOptions = {
  position: "bottom-right",
  effect: "slide",
  timeout: 3000,
};

const JsonContentType = {
  headers: {
    "Content-Type": "application/json",
  },
};

export {
  ApiUrl,
  PayslipFileUrl,
  AlertOptions,
  JsonContentType,
  SurveyPhotoUrl,
  IdeaboxFileUrl,
};
