import { promises as fs } from "fs";
import fsn from "fs";

import path from "path";

const basepath = "files"; 

(async function() {
    try {
        let files = await fs.readdir(basepath);

        for (const item of files) {
            console.log("Running for ", item);
            let ext = item.split(".")[item.split(".").length - 1];
            if (ext !== "js" && ext !== "json" && item.split(".").length > 1) {
                if (fsn.existsSync(path.join(basepath, ext))) {
                    // Move the file to this directory if it's not a js or json file
                    await fs.rename(path.join(basepath, item), path.join(basepath, ext, item));
                } else {
                    await fs.mkdir(path.join(basepath, ext));
                    await fs.rename(path.join(basepath, item), path.join(basepath, ext, item));
                }
            }
        }
    } catch (error) {
        console.error("Error organizing files:", error);
    }
})();
