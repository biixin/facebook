import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';
import { User } from './User';

export interface ImageInstance extends Model {
    id: number,
    idPost: number,
    ref: string
    url: string,
}


export const Image = sequelize.define<ImageInstance>('Image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idPost: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    ref: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    
    

}, {
    tableName: 'images',
    timestamps: false
})




