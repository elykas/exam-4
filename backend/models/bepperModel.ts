export interface Beeper{
    id:string,
    name:string,
    status:StatusBeeper,
    created_at:Date,
    detonated_at?:Date,
    latitude?:number,
    longitude?:number
}

export enum StatusBeeper {
    manufactured = 'manufactured',
    assembled = 'assembled',
    shipped = 'shipped',
    deployed = 'deployed',
    detonated = 'detonated'
}
