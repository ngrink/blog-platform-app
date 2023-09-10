import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';


export class FileService {
    static projectPath = path.join(process.env.PWD, "..");
    static storagePath = path.join(FileService.projectPath, "storage");
    static userStoragePath = (userId) => path.join(FileService.storagePath, "userdata", userId)

    static filePath = (path) => path.join(FileService.storagePath, path)
    static userFilePath = (userId, path_) => path.join(FileService.userStoragePath(userId), path_)

    static relativeToProjectPath = (path_) => path.relative(FileService.projectPath, path_);


    static async saveFile(file) {
        const filepath = FileService.filePath(file.name)

        // FileUpload.UploadedFile.mv()
        file.mv(filepath)
        return filepath;
    }

    static async saveUserFile(userId, file) {
        const extname = path.extname(file.name);
        const filename = uuidv4() + extname;
        const filepath = FileService.userFilePath(userId, filename);

        // FileUpload.UploadedFile.mv()
        file.mv(filepath)
        return filepath;
    }
}
