export type ISub = {
    _id: string;
    name: string;
};

export interface ISubsection {
    _id: string;
    name: string;
    subjection: ISub[];
}
