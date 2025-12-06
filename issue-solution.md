## Version issue while compiled against a different Node.js version

```
// when migrating
npm rebuild
npm run db:migrate

// when rebuilding electron
npm rebuild
rm -rf node_modules package-lock.json
npm install
npm run electron
```
