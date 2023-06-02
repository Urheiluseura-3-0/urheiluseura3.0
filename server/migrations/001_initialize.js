const { DataTypes } = require('sequelize')

module.exports = {
    up: async ({context: queryInterface}) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
                validate: {
                    len: [5, 15],
                },
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            first_name: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40],
                },
            },
            last_name: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40],
                },
            },
            address: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40],
                },
            },
            postal_code: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [5, 5],
                },
            },
            city: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40],
                },
            },
            phone_number: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [5, 15],
                },
            },
            email: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [5, 40],
                },
            },
            person_number: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: -1,
            },
            admin_approved: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            is_admin: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            is_coach: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            is_worker: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 1,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            is_supervisor: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            is_foreman: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        })

        await queryInterface.createTable('teams', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.TEXT,
                allowNull: false,
                unique: true,
                validate: {
                    len: [2, 40],
                },
            },
            category: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 40],
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        })

        await queryInterface.createTable('events', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            created_by_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'SET NULL',
            },
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'teams',
                    key: 'id',
                },
            },
            opponent: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40],
                },
            },
            location: {
                type: DataTypes.TEXT,
                allowNull: false,
                validate: {
                    len: [2, 40],
                },
            },
            date_time: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                validate: {
                    len: [0, 200],
                },
            },
            status: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
                validate: {
                    min: 0,
                    max: 1,
                },
            },
            confirmed_by_id: {
                type: DataTypes.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        })

        await queryInterface.createTable('supervisors', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            team_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'teams',
                    key: 'id',
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE',
            },
            created_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            updated_at: {
                type: DataTypes.DATE,
                allowNull: false,
            },
        })

        // await queryInterface.addConstraint('supervisors', {
        //     fields: ['user_id', 'team_id'],
        //     type: 'unique',
        //     name: 'supervisors_user_id_team_id_key',
        // })

        // await queryInterface.addConstraint('users', {
        //     fields: ['created_by_id'],
        //     type: 'foreign key',
        //     name: 'users_created_by_id_fkey',
        //     references: {
        //         model: 'events',
        //         field: 'id',
        //     },
        //     onDelete: 'SET NULL',
        // })

        // await queryInterface.addConstraint('users', {
        //     fields: ['confirmed_by_id'],
        //     type: 'foreign key',
        //     name: 'users_confirmed_by_id_fkey',
        //     references: {
        //         model: 'events',
        //         field: 'id',
        //     },
        //     onDelete: 'SET NULL',
        // })

        // await queryInterface.addConstraint('teams', {
        //     fields: ['teamId'],
        //     type: 'foreign key',
        //     name: 'teams_teamId_fkey',
        //     references: {
        //         model: 'supervisors',
        //         field: 'id',
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        // })

        // await queryInterface.addConstraint('teams', {
        //     fields: ['userId'],
        //     type: 'foreign key',
        //     name: 'teams_userId_fkey',
        //     references: {
        //         model: 'supervisors',
        //         field: 'id',
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        // })

        // await queryInterface.addConstraint('events', {
        //     fields: ['created_by_id'],
        //     type: 'foreign key',
        //     name: 'events_created_by_id_fkey',
        //     references: {
        //         model: 'users',
        //         field: 'id',
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        // })

        // await queryInterface.addConstraint('events', {
        //     fields: ['teamId'],
        //     type: 'foreign key',
        //     name: 'events_teamId_fkey',
        //     references: {
        //         model: 'teams',
        //         field: 'id',
        //     },
        //     onDelete: 'CASCADE',
        //     onUpdate: 'CASCADE',
        // })

        // await queryInterface.addConstraint('events', {
        //     fields: ['confirmedBySupervisorId'],
        //     type: 'foreign key',
        //     name: 'events_confirmedBySupervisorId_fkey',
        //     references: {
        //         model: 'supervisors',
        //         field: 'id',
        //     },
        //     onDelete: 'SET NULL',
        //     onUpdate: 'CASCADE',
        // })
    },

    down: async (queryInterface) => {
        await queryInterface.dropTable('events')
        await queryInterface.dropTable('teams')
        await queryInterface.dropTable('users')
        await queryInterface.dropTable('supervisors')
    },
}
