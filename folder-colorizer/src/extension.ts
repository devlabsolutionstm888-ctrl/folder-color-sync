import * as vscode from 'vscode';

class CustomFolderItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly color: string,
        public readonly iconPath: vscode.Uri | { light: vscode.Uri; dark: vscode.Uri }
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        
        this.tooltip = `Cartella: ${label} - Colore: ${color}`;
        this.description = color;
        
        this.command = {
            command: 'folderColorizer.selectFolder',
            title: 'Seleziona Cartella',
            arguments: [label, color]
        };
    }
}

class CustomFolderProvider implements vscode.TreeDataProvider<CustomFolderItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<CustomFolderItem | undefined | void> = new vscode.EventEmitter<CustomFolderItem | undefined | void>();
    readonly onDidChangeTreeData: vscode.Event<CustomFolderItem | undefined | void> = this._onDidChangeTreeData.event;

    getTreeItem(element: CustomFolderItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: CustomFolderItem): Thenable<CustomFolderItem[]> {
        const extensionPath = vscode.extensions.getExtension('folder-colorizer')?.extensionPath || '';
        const iconUri = vscode.Uri.file(`${extensionPath}/images/school-folder.svg`);

        const sampleFolders = [
            new CustomFolderItem('Documenti Scuola', '#FF69B4', iconUri),
            new CustomFolderItem('Progetti Code', '#00CED1', iconUri),
            new CustomFolderItem('Archivio Storico', '#FFD700', iconUri)
        ];

        return Promise.resolve(sampleFolders);
    }
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Folder Colorizer Custom View attivata!');

    const folderProvider = new CustomFolderProvider();
    vscode.window.registerTreeDataProvider('folderColorizerView', folderProvider);

    let selectDisposable = vscode.commands.registerCommand('folderColorizer.selectFolder', (name, color) => {
        vscode.window.showInformationMessage(`Hai cliccato sulla cartella: ${name} con colore ${color}`);
    });

    let testDisposable = vscode.commands.registerCommand('folder-colorizer.setColor', () => {
        vscode.window.showInformationMessage('Comando AAA-Test Colora Cartella eseguito con successo!');
    });

    context.subscriptions.push(selectDisposable, testDisposable);
}

export function deactivate() {}