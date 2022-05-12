export interface ColumnItem {
    key: string
    text: string
    fixed?: 'left' | 'right'
    checked?: 'checked' | 'uncheck'
    slot?: boolean
}
export interface DataItem {
    id: string
    [key: string]: any
}

export interface ColWidthItem {
    id: string
    w: number
}
