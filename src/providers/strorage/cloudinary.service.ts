import { Injectable } from '@nestjs/common';
import { createReadStream } from 'streamifier';
import cloudinary from 'src/config/Cloudinary.config';

@Injectable()
export class CloudinaryService {
  private optionsCloud: object;

  constructor() {
    this.optionsCloud = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      folder: 'nest-blog',
    };
  }

  uploadFileBuffer(fileUpload: Express.Multer.File, options?: object): any {
    return new Promise((resolve, reject) => {
      const cld_upload_stream = cloudinary.uploader.upload_stream(
        {
          ...this.optionsCloud,
          ...options,
          public_id: fileUpload.originalname,
        },
        function (error: any, result: any) {
          resolve(result);
          if (error) {
            reject(error);
          }
        },
      );

      createReadStream(fileUpload.buffer).pipe(cld_upload_stream);
    });
  }
}
