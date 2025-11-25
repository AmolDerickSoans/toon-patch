export type Operation =
  | { op: 'add'; path: string; value: any }
  | { op: 'remove'; path: string }
  | { op: 'replace'; path: string; value: any }
  | { op: 'move'; path: string; from: string }
  | { op: 'copy'; path: string; from: string }
  | { op: 'test'; path: string; value: any }

export interface PatchResult<T> {
  newDocument: T
  test?: boolean
  removed?: any
}

export type Validator<T> = (operation: Operation, index: number, tree: T, existingPath: string[]) => void