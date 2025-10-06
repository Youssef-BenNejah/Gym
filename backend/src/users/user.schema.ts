import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  nom: string;

  @Prop({ required: true })
  prenom: string;

  @Prop({ required: true })
  phone: string; // Numéro de téléphone

  @Prop()
  photo?: string; // Photo encodée en base64 ou URL (optionnelle)

  @Prop({ required: true })
  dateDebut: Date;

  @Prop({ required: true })
  dateFin: Date;

  @Prop({
    required: true,
    enum: ['payé', 'non payé', 'en cours'],
    default: 'en cours',
  })
  statut: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
