'use strict';
const electron = require('electron');
const app = electron.app;
const Tray = electron.Tray;
const window = electron.BrowserWindow;
const ipcMain = electron.ipcMain;

app.on('ready', function(){
	let Win = new window({width:800,height:600});
	Win.loadURL('file://' + __dirname + '/img.html');
	Win.show();


	ipcMain.on('setUp', function(event) {
		var size = Win.getBounds();
		 event.sender.send('re-setUp', size);
	});

	ipcMain.on('close', function(event) {
		 Win.close();
	});
	Win.on('closed', function() {
	    Win = null;
	});
	Win.on('resize', function() {
		var size = Win.getBounds();
		event.sender.send('re-setUp', size);
	});
});

app.on('window-all-closed', function() {
  if (process.platform != 'darwin') {
    app.quit();
  }
});