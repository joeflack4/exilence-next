import { Injectable } from '@angular/core';
import { autoUpdater } from 'electron-updater';
import { ElectronService } from './electron.service';
import { dialog } from 'electron';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class AutoUpdaterService {

    constructor(
        private electronService: ElectronService,
        private translate: TranslateService
    ) {
        autoUpdater.on('checking-for-update', () => {
            this.electronService.ipcRenderer.send('statusToWindow',
                this.translate.instant('UPDATER.CHECKING_FOR_UPDATE'));
        });

        autoUpdater.on('update-available', (info) => {
            this.electronService.ipcRenderer.send('statusToWindow',
                this.translate.instant('UPDATER.UPDATE_AVAILABLE'));
        });

        autoUpdater.on('update-not-available', (info) => {
            this.electronService.ipcRenderer.send('statusToWindow',
                this.translate.instant('UPDATER.UPDATE_NOT_AVAILABLE'));
        });

        autoUpdater.on('error', (err) => {
            this.electronService.ipcRenderer.send('statusToWindow',
            this.translate.instant('UPDATER.ERROR_PREFIX') + ' ' + err);
        });

        autoUpdater.on('download-progress', (progressObj) => {
            let log_message = this.translate.instant('UPDATER.DOWNLOAD_SPEED_PREFIX') + ': ' + progressObj.bytesPerSecond;
            log_message = log_message + ' - ' + this.translate.instant('UPDATER.DOWNLOADED') + ' ' + progressObj.percent + '%';
            log_message = log_message + ' (' + progressObj.transferred + '/' + progressObj.total + ')';
            this.electronService.ipcRenderer.send('statusToWindow', log_message);
        });

        autoUpdater.on('update-downloaded', (event, releaseNotes, releaseName) => {
            this.electronService.ipcRenderer.send('statusToWindow', this.translate.instant('UPDATER.UPDATE_DOWNLOADED'));

            const dialogOpts = {
                type: 'info',
                buttons: [this.translate.instant('ACTIONS.RESTART'), this.translate.instant('ACTIONS.LATER')],
                title: this.translate.instant('UPDATER.DIALOG_TITLE'),
                message: process.platform === 'win32' ? releaseNotes : releaseName,
                detail: this.translate.instant('UPDATER.DIALOG_BODY')
            };

            dialog.showMessageBox(dialogOpts, (response) => {
                if (response === 0) { autoUpdater.quitAndInstall(); }
            });
        });
    }
}
