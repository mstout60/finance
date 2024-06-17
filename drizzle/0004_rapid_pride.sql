CREATE TABLE IF NOT EXISTS "connected_banks" (
	"id" text PRIMARY KEY NOT NULL,
	"amount" integer NOT NULL,
	"access_token" text NOT NULL
);
