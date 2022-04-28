import axios from "axios";
const view = axios.create({
  baseURL: "http://api.spacexdata.com/v4/launches",
});
export { view };
