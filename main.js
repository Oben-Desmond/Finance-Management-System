// main.js

// Modules to control application life and create native browser window
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
// import required to launch browser window
const shell = require("electron").shell;

let mainWindow;
let addWindow;
let RSWindow;
let expenseWindow;

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1600,
    height: 1000,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, "src/preload.js"),
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile("src/index.html");

  // Open the DevTools.
  mainWindow.webContents.openDevTools();

  //   Quit app when closed
  mainWindow.on("closed", () => {
    app.quit();
  });

  var menu = Menu.buildFromTemplate([
    {
      label: "Menu",
      submenu: [
        // {
        //   label: "Expenditure List",
        //   click() {
        //     createExpenseWindow();
        //   },
        // },
        // {
        //   label: "Register Student",
        //   click() {
        //     createAddWindow();
        //   },
        // },
        // {
        //   label: "Registered Students",
        //   click() {
        //     createRSWindow();
        //   },
        // },
        {
          role: "reload",
        },
        { type: "separator" },
        {
          label: "Exit",
          accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
          click() {
            app.quit();
          },
        },
      ],
    },
  ]);

  //   if mac, add empty object to menu
  if (process.platform == "darwin") {
    menu.unshift({});
  }

  Menu.setApplicationMenu(menu);
};

// Handle create add window
const createAddWindow = () => {
  // Create the browser window.
  addWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, "src/preload.js"),
    },
  });

  // Open the DevTools.
  // addWindow.webContents.openDevTools();

  // and load the index.html of the app.
  addWindow.loadFile("src/students/add.html");

  //   Garbage collection handle
  addWindow.on("close", () => {
    addWindow = null;
  });
};

// Handle create registered students window
const createRSWindow = () => {
  // Create the browser window.
  RSWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, "src/preload.js"),
    },
  });

  // Open the DevTools.
  // RSWindow.webContents.openDevTools();

  // and load the index.html of the app.
  RSWindow.loadFile("src/students/registeredStudents.html");

  //   Garbage collection handle
  RSWindow.on("close", () => {
    RSWindow = null;
  });
};

// Handle create expenditure list window
const createExpenseWindow = () => {
  // Create the browser window.
  expenseWindow = new BrowserWindow({
    width: 1200,
    height: 900,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: true, // protect against prototype pollution
      preload: path.join(__dirname, "src/preload.js"),
    },
  });

  // Open the DevTools.
  // RSWindow.webContents.openDevTools();

  // and load the index.html of the app.
  expenseWindow.loadFile("src/expenditures/expenseList.html");

  //   Garbage collection handle
  expenseWindow.on("close", () => {
    expenseWindow = null;
  });
};

// Catch payload
ipcMain.on("payload", function (e, student) {
  mainWindow.webContents.send("payload", student);
  addWindow.close();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
