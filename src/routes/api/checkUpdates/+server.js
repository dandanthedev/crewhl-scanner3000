import { json } from "@sveltejs/kit";
import { exec } from "child_process";
export async function GET() {
    try {
        //check if there is a new git commit. If there is, return data true in json, else return data false in json
        const data = await new Promise((resolve, reject) => {
            exec("git fetch && git status", (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                resolve(stdout);
            });
        });
        if (data.includes("Your branch is behind")) {
            return json({ data: true });
        }

        return json({ data: false });
    } catch (error) {
        return json({ data: null });
    }
}