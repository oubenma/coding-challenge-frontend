export type Product = {
    id?:number,
    title: string;
    originalPrice: number;
    originalCurrency: String;
    euroPrice?:number;
    category?: Category;
};

export type Category = {
    id?:number,
    title: string;
    parent?: Category;
};