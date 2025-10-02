# Expo starter

A plain project with the usual suspects set up:

- Expo Router
- Nativewind
- ESLint & Prettier
- TypeScript

It also contains two components:
- `src/components/AppText.tsx` for text
- `src/components/Button.tsx` for 3 button variants

And one utility:
- `src/utils/cn.ts` for merging Tailwind classes

## Start a new project with this template

```sh
# with bun
bun create expo-app my-app --template https://github.com/kadikraman/expo-starter

# with npm
npx create-expo-app my-app --template https://github.com/kadikraman/expo-starter
```


# 1. Make changes to database (via migrations or dashboard)
npx supabase db push

# 2. Regenerate types
npx supabase gen types typescript --linked > database.types.ts