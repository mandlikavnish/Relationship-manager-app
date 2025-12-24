const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 430, // iPhone 16 Pro Max width
        height: 932, // iPhone 16 Pro Max height
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        resizable: true,
        frame: false, // Hides default window decorations to mimic mobile app
    });

    mainWindow.loadFile("index.html"); // Start with login page
});

// Quit when all windows are closed
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

