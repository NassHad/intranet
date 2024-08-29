import { fs } from "fs";
import { path } from "path";
const { NodeSSH } = require("node-ssh");

const ssh = new NodeSSH();

export async function uploadFileToRemoteServer(
    localFilePath,
    remoteFilePath,
    sshConfig
) {
    try {
        // Connect to the remote server
        await ssh.connect(sshConfig);

        // Upload the file
        await ssh.putFile(localFilePath, remoteFilePath);

        console.log("File successfully uploaded to remote server");
    } catch (error) {
        console.error("Failed to upload file to remote server:", error);
    } finally {
        ssh.dispose(); // Close the connection
    }
}
