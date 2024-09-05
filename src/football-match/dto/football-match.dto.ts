import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateFootballMatchDto {
  @Expose()
  @IsString()
  @ApiProperty({ example: 'Real Madrid', required: true })
  homeTeam: string;

  @Expose()
  @IsString()
  @ApiProperty({ example: 'Barcelona', required: true })
  awayTeam: string;

  @Expose()
  @IsDateString()
  @ApiProperty({ example: '2023-04-20T13:27:45.883Z', required: true })
  matchDate: string;
}

export class FootballMatchDto extends CreateFootballMatchDto {
  @Expose()
  @IsUUID()
  @ApiProperty({
    example: '67de3625-fe7b-46a6-9794-f8418dc4c27b',
    required: true,
  })
  id: string;
}
