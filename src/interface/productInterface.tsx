import { IComment } from './commentInterface';

interface ISize {
    width: number;
    height: number;
}
export interface IProduct {

    id: number;
    imageUrl: string;
    name: string;
    count: number,
    size: ISize;
    weight: string;
    comments: [IComment];
    children?: JSX.Element | JSX.Element[];


}