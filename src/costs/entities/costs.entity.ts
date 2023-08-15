import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CostsDocument = Cost & Document;

@Schema()
export class Cost {
  @Prop({ require: true })
  text: string;

  @Prop({ require: true })
  price: number;

  @Prop({ require: true, default: new Date() })
  date: Date;

  @Prop({ require: true, default: '1' })
  userId: string;
}

export const CostsSchema = SchemaFactory.createForClass(Cost);
