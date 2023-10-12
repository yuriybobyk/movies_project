export interface ITrailer{
    id:number;
    results: {key:string, type: 'Bloopers' | 'Featurette' | 'Behind the Scenes' | 'Clip' | 'Trailer' | 'Teaser'}[]
}
