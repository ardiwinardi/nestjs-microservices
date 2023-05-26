import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';
import { PageOptionsDto } from './page-option.dto';

export class FindAllPurchaseOrderDto extends PageOptionsDto {
  @IsDateString()
  @ApiPropertyOptional()
  @IsOptional()
  dateFrom: string;

  @IsDateString()
  @ApiPropertyOptional()
  @IsOptional()
  dateTo: string;
}
