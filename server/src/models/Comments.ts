import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';
import { Friend } from './Friends';
import { Image } from './Images';
import { User } from './User';

export interface CommentInstance extends Model {
    id: number,
    idUser: number,
    idPost: number,
    body: string
}

export const Comment = sequelize.define<CommentInstance>('Comment', {
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
    body: {
        type: DataTypes.STRING(300),
        allowNull: false,
    },
    


}, {
    tableName: 'comments',
    timestamps: false
})



