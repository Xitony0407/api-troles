import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Log, LogDocument } from './entities/log.schema';
import { CreateLogDto } from './dto/create-log.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel(Log.name) private logModel: Model<LogDocument>,
  ) {}

  // Crea un nuevo registro de log
  async create(createLogDto: CreateLogDto) {
    const nuevoLog = new this.logModel(createLogDto);
    return await nuevoLog.save();
  }

  // Trae todos los logs (útil para auditoría)
  async findAll() {
    return await this.logModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string) {
    return await this.logModel.findById(id).exec();
  }
}
