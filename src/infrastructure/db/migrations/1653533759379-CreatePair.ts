import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePair1653533759379 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'pairs',
                columns: [
                    {
                        name: 'pairId',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'score',
                        type: 'numeric',
                    },
                    {
                        name: 'userId1',
                        type: 'uuid',
                    },
                    {
                        name: 'userId2',
                        type: 'uuid',
                        isNullable: true,
                        default: null,
                    },
                ],
            })
        );
        await queryRunner.query(
            `ALTER TABLE "pairs" ADD CONSTRAINT "FK_2e92564784fe26766b01040997f" FOREIGN KEY ("userId1") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`
        );

        await queryRunner.query(
            `ALTER TABLE "pairs" ADD CONSTRAINT "FK_1bd66b7e0599333e61d2e3e1678" FOREIGN KEY ("userId2") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teams');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
