ALTER TABLE "connected_banks" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "connected_banks" DROP COLUMN IF EXISTS "amount";