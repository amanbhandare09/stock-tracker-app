import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AMC } from './entities/amc.entities';
import { MutualFund } from 'src/mutualfund/entities/mf.entities'
import { CreateAMCDto } from './dto/createamc.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AmcService {
    constructor(
        @InjectRepository(AMC) private readonly AMCRepository: Repository<AMC>
    ) { }

    async createAMC(createAMCDto: CreateAMCDto): Promise<AMC> {
        try {
            const { amc_name, amc_short_name } = createAMCDto;

            const existingAMC = await this.AMCRepository.findOneBy({ amc_name });
            const existingAMC_short_name = await this.AMCRepository.findOneBy({ amc_short_name });
            if (existingAMC || existingAMC_short_name) {
                throw new ConflictException(`AMC with short name ${amc_short_name} already exists`);
            }
            const amc: AMC = new AMC();
            amc.amc_id = uuidv4();
            amc.amc_name = createAMCDto.amc_name;
            amc.amc_short_name = createAMCDto.amc_short_name;
            amc.mf_offered = createAMCDto.mf_offered;

            return this.AMCRepository.save(amc);
        } catch (error) {
            throw error;
        }


    }

    async findAllAMC(): Promise<AMC[]> {
        try {
            return await this.AMCRepository.find();
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findAMCbyID(amc_id: string): Promise<AMC> {
        try {
            const amc = await this.AMCRepository.findOneBy({ amc_id });
            if (!amc) {
                throw new NotFoundException(`AMC with ID ${amc_id} not found`);
            }
            return amc;
        } catch (error) {
            throw new InternalServerErrorException(error.message);
        }
    }

    async findMFsByAMC(amc_id: string): Promise<MutualFund[]> {
        const amc = await this.AMCRepository.findOne({
            where: { amc_id },
            relations: ['mutualFunds'],
        });
        if (!amc) {
            throw new NotFoundException(`AMC with ID ${amc_id} not found`);
        }
        return amc.mutualFunds;
    }
}
