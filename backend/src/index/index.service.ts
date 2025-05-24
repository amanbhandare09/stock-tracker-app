import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';
import { Index } from './entities/index.entities';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class IndexService {
  constructor(
    @InjectRepository(Index) private readonly indexRepository: Repository<Index>
  ) { }

  async createIndexes(createIndexDtos: CreateIndexDto): Promise<Index> {
    try {
      const indexName = createIndexDtos.index_name;
      const index_details = await this.indexRepository.findOneBy({ index_name: indexName, is_active: true });

      if (index_details) {
        throw new ConflictException(`Index with name ${indexName} already exists`);
      }

      const index = new Index();
      index.index_id = uuidv4();
      index.index_name = createIndexDtos.index_name;
      index.open = createIndexDtos.open;
      index.close = createIndexDtos.close;
      index.ltp = createIndexDtos.ltp;
      index.w_h = createIndexDtos.w_h;
      index.w_l = createIndexDtos.w_l;
      index.is_active = createIndexDtos.is_active;
      index.index_cat = createIndexDtos.index_cat;

      return await this.indexRepository.save(index);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findAllIndex(): Promise<Index[]> {
    try {
      return await this.indexRepository.find();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findindexbyID(index_id: string): Promise<Index> {
    try {
      const index = await this.indexRepository.findOneBy({ index_id });
      if (!index) {
        throw new NotFoundException(`Index with ID ${index_id} not found`);
      }
      return index;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateIndex(index_id: string, updateIndexDto: UpdateIndexDto): Promise<Index> {
    try {
      // Find the index by its ID
      const index = await this.indexRepository.findOneBy({ index_id });
      if (!index) {
        throw new NotFoundException(`Index with ID ${index_id} not found`);
      }

      // Update the index properties
      if (updateIndexDto.index_name !== undefined) {
        index.index_name = updateIndexDto.index_name;
      }
      if (updateIndexDto.open !== undefined) {
        index.open = updateIndexDto.open;
      }
      if (updateIndexDto.close !== undefined) {
        index.close = updateIndexDto.close;
      }
      if (updateIndexDto.ltp !== undefined) {
        index.ltp = updateIndexDto.ltp;
      }
      if (updateIndexDto.w_h !== undefined) {
        index.w_h = updateIndexDto.w_h;
      }
      if (updateIndexDto.w_l !== undefined) {
        index.w_l = updateIndexDto.w_l;
      }
      if (updateIndexDto.is_active !== undefined) {
        index.is_active = updateIndexDto.is_active;
      }

      // Save the updated index
      return await this.indexRepository.save(index);
    } catch (error) {
      throw new InternalServerErrorException('Failed to update index: ' + error.message);
    }
  }
}
