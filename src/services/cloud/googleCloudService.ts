import config from "@/config";
import GoogleCloudStorage from "./googleCloudStorage";
import util from "util";
import sharp from "sharp";
import path from "path";
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
    let fileName = "";
    try {
      const fileNameWithoutExtName = path.basename(
        file.name,
        path.extname(file.name)
      );
      const bytes = await file.arrayBuffer();
      const sharpImage = sharp(bytes);
      const imageMetadata = await sharpImage.metadata();

      console.log(imageMetadata);

      const webpImageBuffer = await sharpImage
        .resize(1080, 1080, { fit: "inside" })
        .webp({ quality: 75 })
        .toBuffer();
      fileName = fileNameWithoutExtName + ".webp";
      // const blobName = "";
      const blobName = await this.googleCloudStorageResources.uploadFile(
        `${this.baseUrlPath}${fileName}`,
        Buffer.from(webpImageBuffer)
      );
      publicUrl = util.format(
        `https://storage.googleapis.com/${this.googleCloudStorageResources.bucket.name}/${blobName}`
      );
    } catch (error) {
      console.error("Error uploading resource:", error);
    }
    return { publicUrl, fileName };
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
  async existResource(file: File, prefixCut?: boolean) {
    let fileName = file.name;
    if (prefixCut) {
      fileName = path.basename(file.name, path.extname(file.name)) + ".webp";
    }

    return (
      await this.googleCloudStorageResources.existFile(
        `${this.baseUrlPath}${fileName}`
      )
    )[0];
  }
}
