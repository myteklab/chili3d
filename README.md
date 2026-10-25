# Chili3D, as built for mytekdev.com

[Chili3D](https://github.com/xiangechen/chili3d) is a 3D CAD app that runs in the
browser, by xiangechen (仙阁) and contributors. It is licensed under the GNU Affero
General Public License v3, and so is everything here (see LICENSE).

This repository holds the copy that students open on mytekdev.com.

- `main` is the built app we serve, exactly as deployed.
- `source` is the source it was built from: upstream commit
  [75300b38](https://github.com/xiangechen/chili3d/commit/75300b38) (2026-01-30,
  version 0.6.1), plus one commit of our changes.

## What we changed

1. **Platform mode.** `packages/chili-web/src/index.ts` keeps the built app on
   `window.__chili3dApp`. When the embedding page sets `window.__PLATFORM_MODE__`,
   the app fires a `chili3d:ready` event instead of reading a `?url=` model, and the
   page handles opening and saving.
2. **No tracking.** The Microsoft Clarity tag is removed from `index.html`.
3. **Two files left out:** `fonts/fzhei.json` (Founder's FZHei typeface, which the
   build never loads and which Founder licenses separately) and `images/wechat.jpg`.

The wasm geometry kernel (OpenCascade) is upstream's prebuilt file, unchanged.

## Building it

```
git checkout source
npm ci
npx rspack build
```

The output in `dist/` matches `main` byte for byte, apart from the build folder name
that the bundler writes into `916.js`.

`platform.html` and the adapter that connects the app to mytekdev.com are separate
programs that talk to Chili3D through the event above. They are not part of this
repository.
