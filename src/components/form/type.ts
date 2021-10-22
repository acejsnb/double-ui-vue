interface AntType {
    [key: string]: any
}

type ParamOptions = {
    rules: AntType[]
    check: (params: AntType[]) => boolean
    resetErrText: () => void
    success?: (v: string) => void
    fail?: (v: string) => void
    confirmName?: string
}
type SetRules = (name: string, options: ParamOptions) => void;

export type { AntType, SetRules };
