import "dotenv/config";
import axios, { AxiosInstance } from "axios";

class Config {
  public readonly PORT: number;
  public readonly DATABASE_URL: string;
  public readonly axiosInstance: AxiosInstance;
  private readonly API_URL: string;

  constructor() {
    this.PORT = parseInt(process.env.PORT || "3000");
    this.DATABASE_URL = process.env.DATABASE_URL || "";
    this.API_URL = process.env.API_URL || "";

    this.axiosInstance = axios.create({
      baseURL: this.API_URL,
    });
  }

  public verifyConfigData() {
    const errors: string[] = [];
    const envVariables = ["DATABASE_URL", "API_URL"];

    envVariables.forEach((envVariable) => {
      if (!process.env[envVariable]) {
        errors.push(`Environment variable ${envVariable} is missing`);
      }
    });

    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exit(1);
    }
  }
}

export const config: Config = new Config();
