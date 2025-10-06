import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  // ➕ CREATE
  async create(data: Partial<User>): Promise<User> {
    // Vérifie si le numéro de téléphone existe déjà
    const existing = await this.userModel.findOne({ phone: data.phone });
    if (existing) {
      throw new BadRequestException('Un utilisateur avec ce numéro existe déjà.');
    }

    const newUser = new this.userModel(data);
    return newUser.save();
  }

  // 👁️ READ (tous les utilisateurs)
  async findAll(): Promise<User[]> {
    return this.userModel.find().sort({ createdAt: -1 }).exec();
  }

  // 👁️ READ (un seul utilisateur)
  async findOne(id: string): Promise<User> {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('Utilisateur introuvable');
    return user;
  }

  // ✏️ UPDATE
  async update(id: string, data: Partial<User>): Promise<User> {
    // Si le phone change, vérifier qu’il n’appartient pas à un autre user
    if (data.phone) {
      const duplicate = await this.userModel.findOne({ phone: data.phone, _id: { $ne: id } });
      if (duplicate) {
        throw new BadRequestException('Ce numéro est déjà utilisé par un autre utilisateur.');
      }
    }

    const updated = await this.userModel.findByIdAndUpdate(id, data, { new: true });
    if (!updated) throw new NotFoundException('Utilisateur introuvable');
    return updated;
  }

  // ❌ DELETE
  async remove(id: string): Promise<{ message: string }> {
    const result = await this.userModel.findByIdAndDelete(id);
    if (!result) throw new NotFoundException('Utilisateur introuvable');
    return { message: 'Utilisateur supprimé avec succès' };
  }
}
