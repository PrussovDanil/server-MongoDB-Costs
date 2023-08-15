import {
  Controller,
  Get,
  Post,
  Body,
  HttpStatus,
  HttpCode,
  Res,
  Req,
  UseGuards,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CostsService } from './costs.service';
import { CreateCostDto } from './dto/create-cost.dto';
import { JWTGuard } from 'src/auth/guards/jwt.guard';
import { AuthService } from 'src/auth/auth.service';
import { UpdateCostDto } from './dto/update-cost.dto';

@Controller('cost')
export class CostsController {
  constructor(
    private readonly costsService: CostsService,
    private readonly authService: AuthService,
  ) {}

  @UseGuards(JWTGuard)
  @Post()
  @HttpCode(HttpStatus.OK)
  async createCost(@Body() createCostDto: CreateCostDto, @Req() req) {
    const user = await this.authService.getUserByTokenData(req.token);
    return this.costsService.create({
      ...createCostDto,
      userId: user._id as string,
    });
  }

  @UseGuards(JWTGuard)
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req, @Res() res) {
    const token = req.token;
    const user = await this.authService.getUserByTokenData(token);
    const costs = await this.costsService.findAll();
    const filteredCosts = costs.filter(
      (cost) => cost.userId === user._id.toString(),
    );
    return res.send(filteredCosts);
  }

  @UseGuards(JWTGuard)
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  async update(@Body() updateCostDto: UpdateCostDto, @Param('id') id: string) {
    return await this.costsService.update(updateCostDto, id);
  }

  @UseGuards(JWTGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id') id: string) {
    return await this.costsService.remove(id);
  }
}
