SHELL := /bin/zsh

.PHONY: dev studio db install

dev:
	@make install
	@pnpm dev

install:
	@if [ ! -d "node_modules" ]; then \
		echo "Directory 'node_modules' not found. Running 'pnpm install'..."; \
		pnpm install; \
	fi

studio:
	@npx prisma studio

db:
	@npx prisma db push && pnpm install
