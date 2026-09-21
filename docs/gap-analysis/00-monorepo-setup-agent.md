# Monorepo Setup Agent (00)

## Objective

Convert the current single Next.js monolith into a proper `pnpm workspaces` Monorepo with a separation of concerns (`apps/admin` for Backend+Payload, `apps/storefront` for pure Next.js Frontend).

## Tasks

### 1. Root Workspace Setup

- [ ] Initialize `package.json` at the root with `pnpm workspaces` configuration (`apps/*`, `packages/*`).
- [ ] Create `turbo.json` for task orchestration (build, dev, lint).
- [ ] Create `packages/types` directory with a minimal `package.json` for exporting shared Typescript definitions.

### 2. Scaffold `apps/admin` (Backend)

- [ ] Create `apps/admin` folder.
- [ ] Extract Payload CMS dependencies from `apps/storefront/package.json` and move them to `apps/admin/package.json`.
- [ ] Move `/src/payload` from storefront to `apps/admin/src/payload`.
- [ ] Setup `next.config.ts`, `tsconfig.json` for the Admin application.
- [ ] Ensure `(payload)` routes are relocated from storefront to here.

### 3. Cleanup `apps/storefront` (Frontend)

- [ ] Remove all Payload CMS and Database dependencies from `apps/storefront/package.json`.
- [ ] Remove Payload initializations and embedded Admin UI routes from the Next.js `app/` router.
- [ ] Update frontend environment variables to point to `NEXT_PUBLIC_API_URL` (the `apps/admin` local server URL).

### 4. Shared Types Integration

- [ ] Configure `apps/admin` to generate Payload Types into `packages/types/src/index.ts`.
- [ ] Update `apps/storefront` to import types from `@repo/types` instead of internal Payload files.

### 5. Verification

- [ ] Run `pnpm install` successfully at the root level.
- [ ] Ensure `pnpm run dev` starts both `apps/admin` (port 3000) and `apps/storefront` (port 3002) in parallel.
