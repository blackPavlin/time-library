import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type TaskDocument = Task & mongoose.Document;

@Schema()
export class Task {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
    required: true,
  })
  user: string;

  @Prop({
    type: String,
    required: true,
  })
  title: string;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: String,
    required: true,
    enum: ['Film', 'Serial'],
  })
  whatWatch: 'Film' | 'Serial';

  @Prop({
    type: Number,
    required: true,
  })
  time: number;

  @Prop({
    type: [String],
    default: [],
  })
  tags: string[];

  @Prop({
    type: Boolean,
    default: false,
  })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
