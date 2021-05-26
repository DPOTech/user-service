export interface IRepository<T> {
    create: (entity: T) => void;
    update: (entity: T) => void;
    delete: (entity: T) => void;
}