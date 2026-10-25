// Part of the Chili3d Project, under the AGPL-3.0 License.
// See LICENSE file in the project root for full license information.

import { AppBuilder } from "chili-builder";
import { type IApplication, Logger } from "chili-core";
import { Loading } from "./loading";

const loading = new Loading();
document.body.appendChild(loading);

async function handleApplicaionBuilt(app: IApplication) {
    document.body.removeChild(loading);

    // Platform mode: the page that embeds Chili3D sets __PLATFORM_MODE__ and
    // takes over opening and saving documents once the app is built, so the
    // ?url= loader below is skipped.
    (window as any).__chili3dApp = app;
    if ((window as any).__PLATFORM_MODE__) {
        window.dispatchEvent(new CustomEvent("chili3d:ready", { detail: { app } }));
        return;
    }

    const params = new URLSearchParams(window.location.search);
    const url = params.get("url") ?? params.get("model");
    if (url) {
        Logger.info(`load file from url: ${url}`);

        await app.loadFileFromUrl(url);
    }
}

// prettier-ignore
new AppBuilder()
    .useIndexedDB()
    .useWasmOcc()
    .useThree()
    .useUI()
    .build()
    .then(handleApplicaionBuilt)
    .catch((err) => {
        alert(err.message);
    });
