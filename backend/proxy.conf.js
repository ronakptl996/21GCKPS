import https from "https";

const proxy = {
  target,
  secure: false,
  agent: new https.Agent(),
};
