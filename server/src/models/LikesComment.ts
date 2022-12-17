import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';
import { Friend } from './Friends';
import { Image } from './Images';
import { User } from './User';

export interface LikeCommentInstance extends Model {
    id: number,
    idUser: number,
    idComment: number,
}

export const LikeComment = sequelize.define<LikeCommentInstance>('LikeComment', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idComment: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
}, {
    tableName: 'likesComment',
    timestamps: false
})



