import { DataTypes, Model } from 'sequelize'
import { sequelize } from './../instances/mysql';

export interface UserInstance extends Model {
    fromId: any;
    id: number,
    name: string,
    email: string,
    password: string,
    avatar: string
    background: string,
    token: string
    lastLog: Date
}

export const User = sequelize.define<UserInstance>('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: `${process.env.BASE}/assets/man.png`
    },
    background: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: `${process.env.BASE}/assets/bgDefault.png`
    },
    token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    lastLog: {
        type: DataTypes.DATE,
        allowNull: true,
    }

}, {
    tableName: 'users',
    timestamps: false
})



