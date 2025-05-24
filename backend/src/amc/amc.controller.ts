import { Controller, Get, Post, Body, Param, UsePipes, ValidationPipe, HttpException } from '@nestjs/common';
import { AmcService } from './amc.service';
import { CreateAMCDto } from './dto/createamc.dto';


@Controller('amc')
@UsePipes(new ValidationPipe())
export class AmcController {
    constructor(private readonly amcService: AmcService) {}

    @Get()
    getAmcs() {
        return this.amcService.findAllAMC();
    }

    @Get(':id')
    getAmcById(@Param('id') id: string) {
        return this.amcService.findAMCbyID(id);
    }

    @Post()
    createAmc(@Body() createAMCDto: CreateAMCDto) {
        try {
            return this.amcService.createAMC(createAMCDto);
        } catch (error) {
            throw new HttpException(error.response || 'Internal Server Error', error.status || 500);
        }
    }

    @Get(':id/mutualfunds')
    getMutualFundsByAmc(@Param('id') id: string) {
        return this.amcService.findMFsByAMC(id);
    }
}
