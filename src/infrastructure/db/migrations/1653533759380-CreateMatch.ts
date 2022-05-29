import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMatch1653533759380 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
        await queryRunner.createTable(
            new Table({
                name: 'matches',
                columns: [
                    {
                        name: 'matchId',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'date',
                        type: 'date',
                    },
                    {
                        name: 'result',
                        type: 'varchar',
                    },
                    {
                        name: 'pairId1',
                        type: 'uuid',
                    },
                    {
                        name: 'pairId2',
                        type: 'uuid',
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
            `ALTER TABLE "matches" ADD CONSTRAINT "FK_MatchLocation" FOREIGN KEY ("locationId") REFERENCES "locations"("locationId") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "matches" ADD CONSTRAINT "FK_Pair1_Match" FOREIGN KEY ("pairId1") REFERENCES "pairs"("pairId") ON DELETE CASCADE ON UPDATE CASCADE`
        );
        await queryRunner.query(
            `ALTER TABLE "matches" ADD CONSTRAINT "FK_Pair2_Match" FOREIGN KEY ("pairId2") REFERENCES "pairs"("pairId") ON DELETE CASCADE ON UPDATE CASCADE`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('matches');
        await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    }
}
