.PHONY: dev
dev:
	@[ ! -d "node_modules" ] && pnpm install
	@pnpm dev

.PHONY: studio
studio:
	@pnpm db:studio

.PHONY: db
db:
	@pnpm db:push && npx prisma generate
