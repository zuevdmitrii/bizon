export enum Operator {
  eq = "eq",
  contains = "contains",
}

export enum Logic {
  and = "and",
  or = "or",
}

export interface IDataProviderFilter {
  logic: Logic,
  filters: IFilter[]
}

export interface IFilter {
  field: string;
  value: string;
  operator: Operator;
}
