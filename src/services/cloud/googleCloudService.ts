import config from "@/config";
import GoogleCloudStorage from "./googleCloudStorage";
import util from "util";

export default class GoogleCloudService {
  public googleCloudStorageResources: GoogleCloudStorage;
  public baseUrlPath: string;
  constructor() {
    this.baseUrlPath = "images/";
    this.googleCloudStorageResources = new GoogleCloudStorage(
      config.GOOGLE_STORAGE.resourcesBucket
    );
  }

  async uploadResource(file: File) {
    let publicUrl = "";
    try {
      const fileName = file.name;
      const bytes = await file.arrayBuffer();
      const blobName = await this.googleCloudStorageResources.uploadFile(
        `${this.baseUrlPath}${fileName}`,
        Buffer.from(bytes)
      );
      publicUrl = util.format(
        `https://storage.googleapis.com/${this.googleCloudStorageResources.bucket.name}/${blobName}`
      );
    } catch (error) {
      console.error("Error uploading resource:", error);
    }
    return publicUrl;
  }
  async deleteResource(filePath: string) {
    try {
      const result = await this.googleCloudStorageResources.deleteFile(
        `${this.baseUrlPath}${filePath}`
      );
      return result;
    } catch (error) {
      console.error("Error uploading resource:", error);
    }
  }
  async existResource(file: File) {
    const fileName = file.name;

    return (
      await this.googleCloudStorageResources.existFile(
        `${this.baseUrlPath}${fileName}`
      )
    )[0];
  }
}
