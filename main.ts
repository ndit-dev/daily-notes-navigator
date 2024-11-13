import { App, Plugin, TFile, MarkdownView, Notice } from 'obsidian';
import { moment } from 'obsidian';

export default class DailyNotesNavigator extends Plugin {
    async onload() {
        // Original commands
        this.addCommand({
            id: 'goto-next-daily',
            name: 'Go to next daily note',
            callback: () => this.navigateDaily(1)
        });

        this.addCommand({
            id: 'goto-previous-daily',
            name: 'Go to previous daily note',
            callback: () => this.navigateDaily(-1)
        });

        // New commands for enhanced navigation
        this.addCommand({
            id: 'goto-next-week',
            name: 'Go to next week',
            callback: () => this.navigateDaily(7)
        });

        this.addCommand({
            id: 'goto-previous-week',
            name: 'Go to previous week',
            callback: () => this.navigateDaily(-7)
        });

        this.addCommand({
            id: 'goto-next-month',
            name: 'Go to next month',
            callback: () => this.navigateToMonth(1)
        });

        this.addCommand({
            id: 'goto-previous-month',
            name: 'Go to previous month',
            callback: () => this.navigateToMonth(-1)
        });

        this.addCommand({
            id: 'goto-month-start',
            name: 'Go to start of month',
            callback: () => this.navigateToMonthBoundary('start')
        });

        this.addCommand({
            id: 'goto-month-end',
            name: 'Go to end of month',
            callback: () => this.navigateToMonthBoundary('end')
        });
    }

    async navigateDaily(offset: number) {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice('No active file');
            return;
        }

        const currentDate = this.getDateFromFilename(activeFile.basename);
        if (!currentDate) {
            new Notice('Current file is not a daily note');
            return;
        }

        const targetDate = moment(currentDate).add(offset, 'days');
        const targetDateString = targetDate.format('YYYY-MM-DD');
        await this.navigateToDate(targetDate);
    }

    async navigateToMonth(offset: number) {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice('No active file');
            return;
        }

        const currentDate = this.getDateFromFilename(activeFile.basename);
        if (!currentDate) {
            new Notice('Current file is not a daily note');
            return;
        }

        const targetDate = moment(currentDate).add(offset, 'months');
        await this.navigateToDate(targetDate);
    }

    async navigateToMonthBoundary(boundary: 'start' | 'end') {
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) {
            new Notice('No active file');
            return;
        }

        const currentDate = this.getDateFromFilename(activeFile.basename);
        if (!currentDate) {
            new Notice('Current file is not a daily note');
            return;
        }

        const targetDate = boundary === 'start' 
            ? moment(currentDate).startOf('month')
            : moment(currentDate).endOf('month');
        
        await this.navigateToDate(targetDate);
    }

    async navigateToDate(targetDate: moment.Moment) {
        const targetDateString = targetDate.format('YYYY-MM-DD');
        const activeFile = this.app.workspace.getActiveFile();
        if (!activeFile) return;

        const dailyNotesFolder = this.getParentFolderPath(activeFile);
        const targetFilePath = `${dailyNotesFolder}${targetDateString}.md`;
        const targetFile = this.app.vault.getAbstractFileByPath(targetFilePath);
        
        if (targetFile instanceof TFile) {
            new Notice(`Opening note for ${targetDate.format('MMMM Do, YYYY')}`);
            const leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (leaf) {
                await leaf.leaf.openFile(targetFile);
            }
        } else {
            new Notice(`Creating new note for ${targetDate.format('MMMM Do, YYYY')}`);
            const newFile = await this.app.vault.create(targetFilePath, '');
            const leaf = this.app.workspace.getActiveViewOfType(MarkdownView);
            if (leaf) {
                await leaf.leaf.openFile(newFile);
            }
        }
    }

    private getDateFromFilename(basename: string): moment.Moment | null {
        const match = basename.match(/(\d{4}-\d{2}-\d{2})/);
        if (match) {
            const date = moment(match[1], 'YYYY-MM-DD', true);
            if (date.isValid()) {
                return date;
            }
        }
        return null;
    }

    private getParentFolderPath(file: TFile): string {
        const parts = file.path.split('/');
        parts.pop();
        return parts.length > 0 ? parts.join('/') + '/' : '';
    }
}