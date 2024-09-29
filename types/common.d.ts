export interface IOption<V = string, K = string> {
  label: K
  value: V
  children?: IOption<V, K>[]
}
