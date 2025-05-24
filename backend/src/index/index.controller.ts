import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { IndexService } from './index.service';
import { CreateIndexDto } from './dto/create-index.dto';
import { UpdateIndexDto } from './dto/update-index.dto';

  @Controller('index')
  export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Post()
  async createIndexes(@Body() createIndexDtos: CreateIndexDto) {
    return this.indexService.createIndexes(createIndexDtos);
  }
  
  @Get()
  async findAll() {
    return this.indexService.findAllIndex();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.indexService.findindexbyID(id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateIndexDto: UpdateIndexDto) {
    return this.indexService.updateIndex(id, updateIndexDto);
  }
}
