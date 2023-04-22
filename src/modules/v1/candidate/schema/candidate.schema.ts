import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CandidateDocument = Candidate & Document;

@Schema({ timestamps: true })
export class Candidate {
  @Prop()
  fullname: string;

  @Prop({ lowercase: true })
  course: string;

  @Prop()
  level: number;

  @Prop()
  manifestoe: string;

  @Prop({ lowercase: true })
  position: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  votes: number;
}

export const CandidateSchema = SchemaFactory.createForClass(Candidate);
