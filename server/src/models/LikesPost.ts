import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';
import { Friend } from './Friends';
import { Image } from './Images';
import { User } from './User';

export interface LikePostInstance extends Model {
    id: number,
    idUser: number,
    idPost: number,
}

export const LikePost = sequelize.define<LikePostInstance>('LikePost', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idPost: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    


}, {
    tableName: 'likesPost',
    timestamps: false
})



