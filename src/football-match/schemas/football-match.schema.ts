import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false })
export class FootballMatch extends Document {
  @Prop({ unique: true, index: true, type: 'string' })
  id: string;

  @Prop()
  homeTeam: string;

  @Prop()
  awayTeam: string;

  @Prop({ required: true })
  matchDate: Date;
}

export const FootballMatchSchema = SchemaFactory.createForClass(FootballMatch);
