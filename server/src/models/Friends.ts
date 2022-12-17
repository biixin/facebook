import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';
import { User } from './User';

export interface FriendInstance extends Model {
    id: number,
    from: number,
    to: string,
    status: status,
    toId: {
        id: number,
        name: string,
        email: string,
        Posts: [
            {
                id: number,
                idUser: number,
                body: string,
                date: Date
            }
        ]
    },
    fromId: {
        id: number,
        name: string,
        email: string,
        Posts: [
            {
                id: number,
                idUser: number,
                body: string,
                date: Date
            }
        ]
    },
    sender: boolean
}
enum status {
    'blocked',
    'pendent',
    'friend'
}

export const Friend = sequelize.define<FriendInstance>('Friend', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    from: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    to: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('blocked', 'pendent', 'friend'),
        allowNull: false,
        defaultValue: 'pendent'
    },
    sender: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: 'friends',
    timestamps: false
})




