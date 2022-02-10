module.exports = class Data1644527888771 {
  name = 'Data1644527888771'

  async up(db) {
    await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
    await db.query(`CREATE TABLE "crowdloan" ("id" character varying NOT NULL, "cap" numeric NOT NULL, "first_period" numeric NOT NULL, "last_period" numeric NOT NULL, "end" numeric NOT NULL, "contributors" jsonb, "raised" numeric NOT NULL, "chain_name" text NOT NULL, "block_number" numeric, "status" character varying(9), "parachain_id" character varying NOT NULL, CONSTRAINT "PK_19a05e349701577c8c1679ae84d" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_005883fcd4519fa5ae88706b3a" ON "crowdloan" ("parachain_id") `)
    await db.query(`CREATE INDEX "IDX_c7f626a4ebde04b5e0c5b829a6" ON "crowdloan" ("chain_name") `)
    await db.query(`CREATE TABLE "parachain" ("id" character varying NOT NULL, "name" text, CONSTRAINT "PK_0f6ac85862a6ca7c8873f699b61" PRIMARY KEY ("id"))`)
    await db.query(`CREATE TABLE "contribution" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_id" text, "extrinsic_id" text, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "chain_name" text NOT NULL, "success" boolean, "account" text, "amount" numeric, "crowdloan_id" character varying, CONSTRAINT "PK_878330fa5bb34475732a5883d58" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_9b160aadef096ecfb822596aaf" ON "contribution" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_34a9b7747fbe547737724da5a3" ON "contribution" ("crowdloan_id") `)
    await db.query(`CREATE INDEX "IDX_0ae793de797f960ee329368a5e" ON "contribution" ("account") `)
    await db.query(`CREATE TABLE "transfer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_id" text, "extrinsic_id" text, "block_number" numeric, "extrinsic_hash" text, "to" text, "from" text, "amount" numeric, "success" boolean, "name" text, "date" TIMESTAMP WITH TIME ZONE, "chain_name" text, CONSTRAINT "PK_fd9ddbdd49a17afcbe014401295" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_4cbc37e8c3b47ded161f44c24f" ON "transfer" ("to") `)
    await db.query(`CREATE INDEX "IDX_be54ea276e0f665ffc38630fc0" ON "transfer" ("from") `)
    await db.query(`CREATE INDEX "IDX_082fbbbbe6a84c865abaa72817" ON "transfer" ("chain_name") `)
    await db.query(`CREATE TABLE "reward" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "event_id" text, "extrinsic_id" text, "date" TIMESTAMP WITH TIME ZONE, "block_number" numeric, "extrinsic_hash" text, "chain_name" text, "account" text, "amount" numeric, "name" text, "era" integer, "validator" text, CONSTRAINT "PK_a90ea606c229e380fb341838036" PRIMARY KEY ("id"))`)
    await db.query(`CREATE INDEX "IDX_a76ad44e5c4b11502f6116db54" ON "reward" ("chain_name") `)
    await db.query(`CREATE INDEX "IDX_b2d494a9fb70b08244806d2872" ON "reward" ("account") `)
    await db.query(`ALTER TABLE "crowdloan" ADD CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5" FOREIGN KEY ("parachain_id") REFERENCES "parachain"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    await db.query(`ALTER TABLE "contribution" ADD CONSTRAINT "FK_34a9b7747fbe547737724da5a3b" FOREIGN KEY ("crowdloan_id") REFERENCES "crowdloan"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
  }

  async down(db) {
    await db.query(`DROP TABLE "crowdloan"`)
    await db.query(`DROP INDEX "public"."IDX_005883fcd4519fa5ae88706b3a"`)
    await db.query(`DROP INDEX "public"."IDX_c7f626a4ebde04b5e0c5b829a6"`)
    await db.query(`DROP TABLE "parachain"`)
    await db.query(`DROP TABLE "contribution"`)
    await db.query(`DROP INDEX "public"."IDX_9b160aadef096ecfb822596aaf"`)
    await db.query(`DROP INDEX "public"."IDX_34a9b7747fbe547737724da5a3"`)
    await db.query(`DROP INDEX "public"."IDX_0ae793de797f960ee329368a5e"`)
    await db.query(`DROP TABLE "transfer"`)
    await db.query(`DROP INDEX "public"."IDX_4cbc37e8c3b47ded161f44c24f"`)
    await db.query(`DROP INDEX "public"."IDX_be54ea276e0f665ffc38630fc0"`)
    await db.query(`DROP INDEX "public"."IDX_082fbbbbe6a84c865abaa72817"`)
    await db.query(`DROP TABLE "reward"`)
    await db.query(`DROP INDEX "public"."IDX_a76ad44e5c4b11502f6116db54"`)
    await db.query(`DROP INDEX "public"."IDX_b2d494a9fb70b08244806d2872"`)
    await db.query(`ALTER TABLE "crowdloan" DROP CONSTRAINT "FK_005883fcd4519fa5ae88706b3a5"`)
    await db.query(`ALTER TABLE "contribution" DROP CONSTRAINT "FK_34a9b7747fbe547737724da5a3b"`)
  }
}
