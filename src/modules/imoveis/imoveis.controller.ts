import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ImoveisService } from './imoveis.service';
import { ImovelDTO } from './imovel.dto';

@Controller('imoveis')
export class ImoveisController {
  constructor(private readonly imoveisService: ImoveisService) {}

  @Post()
  async create(@Body() data: ImovelDTO) {
    return this.imoveisService.create(data);
  }

  @Get()
  async findAll() {
    return this.imoveisService.findAll();
  }

  @Delete('many')
  async deleteMany(@Body() data: { id_imovel: string}[]) {
    return this.imoveisService.deleteMany(data);
  }
}
