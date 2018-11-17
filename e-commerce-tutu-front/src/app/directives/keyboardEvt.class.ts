export class KeyboardEvt {
    public static keyDonw(e: KeyboardEvent) {
        if ([46, 8, 9, 27, 13].indexOf(e.keyCode) !== -1) {
            return;
        }

        if ((e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }

        const ch = (e.key);
        const regEx = new RegExp('^[0-9]*$');
        if (regEx.test(ch)) {
            return;
        } else {
            e.preventDefault();
        }
    }

    public static onPaste(e: any, valorBase: string): string {
        e.preventDefault();

        const clp = (e.originalEvent || e).clipboardData;
        let text: string;

        if (clp === undefined || clp === null) {
            text = (<any>window).clipboardData.getData('text') || '';
        } else {
            text = clp.getData('text/plain') || '';
        }

        text = valorBase + text.trim();
        return text;
    }
}
