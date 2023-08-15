import { Injectable } from '@nestjs/common';
import { CreateCostDto } from './dto/create-cost.dto';
import { UpdateCostDto } from './dto/update-cost.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Cost, CostsDocument } from './entities/costs.entity';
import { Model } from 'mongoose';

@Injectable()
export class CostsService {
  constructor(
    @InjectModel(Cost.name) private costsModel: Model<CostsDocument>,
  ) {}
  async create(createCostDto: CreateCostDto): Promise<Cost> {
    const createCost = new this.costsModel(createCostDto);
    return await createCost.save();
  }

  async findAll(): Promise<Cost[]> {
    return await this.costsModel.find();
  }

  async findOne(id: string): Promise<Cost> {
    return this.costsModel.findOne({ _id: id });
  }

  async update(updateCostDto: UpdateCostDto, id: string) {
    await this.costsModel.updateOne(
      { _id: id },
      {
        $set: {
          ...updateCostDto,
        },
      },
    );
    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.costsModel.deleteOne({ _id: id });
  }
}
