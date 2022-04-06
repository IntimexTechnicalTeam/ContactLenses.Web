export default class LensMaterial {
    [x: string]: string;
    private _Id: string;
    public get Id(): string {
        return this._Id;
    }
    public set Id(v: string) {
        this._Id = v;
    }
    private _Text: string;
    public get Text(): string {
        return this._Text;
    }
    public set Text(v: string) {
        this._Text = v;
    }
    constructor(Id: string, Text: string) {
        this._Id = Id;
        this._Text = Text;
    }
}
