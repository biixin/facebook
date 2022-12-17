import { DataTypes, Model } from 'sequelize'
import { sequelize } from '../instances/mysql';
import { Comment } from './Comments';
import { Friend } from './Friends';
import { Image } from './Images';
import { User } from './User';
import { LikePost, LikePostInstance } from './LikesPost';
import { LikeComment } from './LikesComment';

export interface PostInstance extends Model {
    id: number,
    idUser: number,
    body: string,
    privacity: privacity
    date: Date,
}
enum privacity {
    'public',
    'friends',
}

export const Post = sequelize.define<PostInstance>('Post', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    idUser: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    body: {
        type: DataTypes.STRING(300),
        allowNull: true,
    },
    privacity: {
        type: DataTypes.ENUM('public', 'friends'),
        allowNull: false,
        defaultValue: 'public'
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }

}, {
    tableName: 'posts',
    timestamps: false
})

Post.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'idUser'
})
User.hasMany(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'idUser'
})

Friend.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'from',
    as: 'fromId'
})

Friend.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'to',
    as: 'toId'
})

User.hasMany(Friend, {
    onDelete: 'CASCADE',
    foreignKey: 'from',
    as: 'fromId'
})

User.hasMany(Friend, {
    onDelete: 'CASCADE',
    foreignKey: 'to',
    as: 'toId'
})

Post.hasOne(Image, {
    onDelete: 'CASCADE',
    foreignKey: 'idPost'
})

Image.belongsTo(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'idPost'
})


//Comments
Post.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'idPost'
} )

Comment.belongsTo(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'idPost'
})
Comment.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'idUser'
})


// PostLike
Post.hasMany(LikePost, {
    onDelete: 'CASCADE',
    foreignKey: 'idPost'
})

LikePost.belongsTo(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'idPost'
})

LikePost.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'idUser'
})


// CommentLike
Comment.hasMany(LikeComment, {
    onDelete: 'CASCADE',
    foreignKey: 'idComment'
})

LikeComment.belongsTo(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'idComment'
})

LikeComment.belongsTo(User, {
    onDelete: 'CASCADE',
    foreignKey: 'idUser'
})







// User.hasMany(Friend, {
//     onDelete: 'CASCADE',
//     foreignKey: 'from',
//     as: 'fromList'
// })
// User.hasMany(Friend, {
//     onDelete: 'CASCADE',
//     foreignKey: 'to',
//     as: 'toList'
// })


