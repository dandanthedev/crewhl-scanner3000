import { json } from "@sveltejs/kit";
import { exec } from "child_process";
export async function GET() {
    //git pull and build, then restart the server. Send output to console
    const data = await new Promise((resolve, reject) => {
        exec("shutdown now", (error, stdout, stderr) => {
            if (error) {
                reject(error);
            }
            resolve(stdout);
        });
    }
    );
    return json({ data });


}