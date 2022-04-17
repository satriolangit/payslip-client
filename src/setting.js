// const ApiUrl = "https://hrinformationsystem.com/api";
// const PayslipFileUrl = "https://hrinformationsystem.com/payslip/";
// const SurveyPhotoUrl = "https://hrinformationsystem.com/files-survey/";
// const IdeaboxFileUrl = "https://hrinformationsystem.com/files-ideabox/";

const ApiUrl = "http://localhost:3001/api";
const PayslipFileUrl = "http://localhost:3001/payslip/";
const SurveyPhotoUrl = "http://localhost:3001/files-survey/";
const IdeaboxFileUrl = "http://localhost:3001/files-ideabox/";

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
