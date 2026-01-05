import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { R2Service } from './r2.service';
import { AuthGuard } from '@nestjs/passport';
import { join } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import * as mime from 'mime-types';

@Controller('files')
export class FilesController {
  constructor(
    private readonly r2Service: R2Service,
    private readonly configService: ConfigService,
  ) {}

  @Post('upload')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FileInterceptor('file', {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    }
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.saveFile(file);
  }

  @Post('uploads')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files', 10, {
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    }
  }))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    const results = await Promise.all(files.map(file => this.saveFile(file)));
    return { 
      urls: results.map(u => u.url),
      files: results 
    };
  }

  private async saveFile(file: Express.Multer.File) {
    const r2Configured = this.configService.get('R2_ACCESS_KEY_ID') && 
                        this.configService.get('R2_ENDPOINT');

    let url: string;
    if (r2Configured) {
      url = await this.r2Service.uploadFile(file);
    } else {
      // 로컬 스토리지 폴백
      const uploadDir = join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const fileExtension = mime.extension(file.mimetype) || 'bin';
      const fileName = `${uuidv4()}.${fileExtension}`;
      const filePath = join(uploadDir, fileName);
      
      fs.writeFileSync(filePath, file.buffer);
      
      const backendUrl = this.configService.get('BACKEND_URL') || 'http://localhost:3001';
      url = `${backendUrl}/uploads/${fileName}`;
    }
    return { url, name: file.originalname };
  }
}
