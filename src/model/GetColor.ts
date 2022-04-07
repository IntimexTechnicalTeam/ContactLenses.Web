export default class GetColor {
    private _Id: string = '';
    public get Id(): string {
        return this._Id;
    }
    public set Id(v: string) {
        this._Id = v;
    }
    private _value: string;
    public get Text(): string {
        return this._value;
    }
    public set Text(v: string) {
        this._value = v;
    }
    constructor(Id: string, Text: string) {
        this._Id = Id;
        this._value = Text;
    }
}
