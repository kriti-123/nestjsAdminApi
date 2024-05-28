import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model, Document } from 'mongoose';

export class CURDmongooseService<T extends Document, CreateDto, UpdateDto> {
  constructor(public model: Model<T>) {}

  async create(data: CreateDto): Promise<T> {
    try {
      return this.model.create(data);
    } catch (err) {}
  }

  async get(id: string) {
    const data = await this.model.findById(id);
    return data;
  }
  async findOne(data) {
    console.log(data, 'findone method data');
    return await this.model.findOne(data);
  }

  async delete(id: string) {
    const data = await this.model.findByIdAndDelete(id);
    return data;
  }
  async update(data: UpdateDto, id: string) {
    const updatedData = await this.model.findByIdAndUpdate(id, data, {
      new: true,
    });
    return updatedData;
  }
}
