import config from "@/config";
import { Bucket, Storage } from "@google-cloud/storage";

export default class GoogleCloudStorage {
  public bucketName: string;
  public storage: Storage;
  public bucket: Bucket;

  constructor(bucketName: string) {
    this.bucketName = bucketName;
    let serviceAccountKey = {};
    if (
      config.GOOGLE_STORAGE.serviceAccountKeyBase64 !== undefined &&
      config.GOOGLE_STORAGE.serviceAccountKeyBase64 !== "" &&
      config.GOOGLE_STORAGE.serviceAccountKeyBase64 !== null
    ) {
      const serviceAccountKeyString = Buffer.from(
        config.GOOGLE_STORAGE.serviceAccountKeyBase64,
        "base64"
      );
      serviceAccountKey = JSON.parse(serviceAccountKeyString.toString());
    }
    this.storage = new Storage({
      credentials: serviceAccountKey,
    });
    this.bucket = this.storage.bucket(this.bucketName);
  }

  async uploadFile(fileName: string, buffer: Buffer) {
    try {
      const blob = this.bucket.file(fileName);
      await blob.save(buffer, {
        resumable: false,
      });
      return blob.name;
    } catch (error) {
      console.error("Error uploading File to gc:", error);
    }
  }

  async deleteFile(fileName: string) {
    try {
      const resp = await this.bucket.file(fileName).delete();
      return resp;
    } catch (error) {
      throw error;
    }
  }

  async downloadFile(filePath: string) {
    try {
      const file = this.bucket.file(filePath).download();
      return file;
    } catch (error) {
      throw error;
    }
  }
  async existFile(filePath: string) {
    try {
      const file = this.bucket.file(filePath);
      return await file.exists();
    } catch (error) {
      throw error;
    }
  }
}
