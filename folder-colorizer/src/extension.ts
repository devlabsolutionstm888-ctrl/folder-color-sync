import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Folder Colorizer è ora attivo!');

    let disposable = vscode.commands.registerCommand('folder-colorizer.setColor', async () => {
        const folderName = await vscode.window.showInputBox({
            placeHolder: 'Nome della cartella (es. view, page, components)',
            prompt: 'Inserisci il nome della cartella da colorare'
        });

        if (!folderName) {
            return;
        }

        const colorHex = await vscode.window.showInputBox({
            placeHolder: '#FF69B4 o un nome di colore',
            prompt: 'Inserisci il codice esadecimale del colore'
        });

        if (!colorHex) {
            return;
        }

        const config = vscode.workspace.getConfiguration('workbench');
        const colorCustomizations: Record<string, any> = config.get('colorCustomizations') || {};

        colorCustomizations[`folder.color.${folderName}`] = colorHex;
        colorCustomizations[`list.activeSelectionForeground`] = colorHex;

        try {
            await config.update('colorCustomizations', colorCustomizations, vscode.ConfigurationTarget.Workspace);
            vscode.window.showInformationMessage(`Cartella e scrittura "${folderName}" impostate con il colore ${colorHex}!`);
        } catch (error) {
            vscode.window.showErrorMessage(`Errore durante il salvataggio: ${error}`);
        }
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
