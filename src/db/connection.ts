import config from "@/config";
import mongoose, { Mongoose } from "mongoose";

const maxPoolSize = 15;
const connectTimeoutMS = 15000;
const socketTimeoutMS = 30000;
const autoIndex = true; //Cambiar a false en produccion

export default async function connectDB() {
  const mongooseConnection = new MongooseConnection();
  await mongooseConnection.createCustomConnection();
}

export class MongooseConnection {
  public MONGO_URI: string;
  public LOCAL_URL: string;

  constructor() {
    this.MONGO_URI = "";
    this.LOCAL_URL = "";
  }

  buildURI() {
    const DB_HOST = config.DATABASE.dbHost;
    const DB_PORT = config.DATABASE.dbPort;
    const DB_NAME = config.DATABASE.dbNAME;
    const DB_PASSWORD = encodeURIComponent(config.DATABASE.dbPassword);
    const DB_USER = encodeURIComponent(config.DATABASE.dbUser);

    this.MONGO_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
    this.LOCAL_URL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;
  }

  async createCustomConnection() {
    if (MongooseConnection.DBConnection) {
      console.info("Connection already exist to the database");
      return MongooseConnection.DBConnection;
    }
    try {
      this.buildURI();

      // await mongoose
      //   .disconnect()
      //   .then(() => console.log("All Mongoose connections closed"))
      //   .catch((err) =>
      //     console.error("Error closing Mongoose connections:", err)
      //   );
      console.info("Connecting to the database...");
      MongooseConnection.DBConnection = await mongoose.connect(
        config.DATABASE.isLocalDB == "true" ? this.LOCAL_URL : this.MONGO_URI,
        {
          maxPoolSize: maxPoolSize,
          connectTimeoutMS: connectTimeoutMS,
          socketTimeoutMS: socketTimeoutMS,
          autoIndex: autoIndex,
        }
      );
      console.info("Connected to the database");
    } catch (error) {
      console.error(
        `An error occurred while connecting to the database: ${error}`
      );
    }
  }

  public static DBConnection: Mongoose;

  static get maxPoolSize() {
    return maxPoolSize;
  }

  static get connectTimeoutMS() {
    return connectTimeoutMS;
  }

  static get socketTimeoutMS() {
    return socketTimeoutMS;
  }

  static get autoIndex() {
    return autoIndex;
  }
}
