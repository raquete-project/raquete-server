import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateLocation1636840639205 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'locations',
                columns: [
                    {
                        name: 'locationId',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'address',
                        type: 'varchar',
                    },
                ],
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('locations');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
