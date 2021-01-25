import axios from "axios";
import { base } from "../common";

const API = axios.create({
    baseURL: base.baseUrl,
})

export default API
