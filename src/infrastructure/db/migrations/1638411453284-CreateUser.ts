import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { SkillLevel } from '@domain/@types/SkillLevel';

export class CreateUser1638411453284 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'userId',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },
                    {
                        name: 'skillLevel',
                        type: 'enum',
                        enum: [
                            SkillLevel.BEGGINER,
                            SkillLevel.REGULAR,
                            SkillLevel.EXPERT,
                        ],
                    },
                    {
                        name: 'score',
                        type: 'numeric',
                    },
                    {
                        name: 'locationId',
                        type: 'uuid',
                        default: null,
                    },
                ],
            })
        );
        await queryRunner.query(
            `ALTER TABLE "users" ADD CONSTRAINT "FK_UserLocation" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
