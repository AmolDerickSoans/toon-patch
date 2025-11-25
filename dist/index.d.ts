//#region src/types.d.ts
type Operation = {
  op: "add";
  path: string;
  value: any;
} | {
  op: "remove";
  path: string;
} | {
  op: "replace";
  path: string;
  value: any;
} | {
  op: "move";
  path: string;
  from: string;
} | {
  op: "copy";
  path: string;
  from: string;
} | {
  op: "test";
  path: string;
  value: any;
};
interface PatchResult<T> {
  newDocument: T;
  test?: boolean;
  removed?: any;
}
type Validator<T> = (operation: Operation, index: number, tree: T, existingPath: string[]) => void;
//#endregion
//#region src/patch.d.ts
/**
* Converts a JSON Patch array to TOON Patch string.
* Wraps in { patches: [...] } for indented object list format.
*/
declare function toToonPatch(patch: Operation[]): string;
/**
* Converts a TOON Patch string to JSON Patch array.
*/
declare function fromToonPatch(toonPatch: string): Operation[];
/**
* Validates a TOON Patch string.
* Returns true if valid, throws error if invalid.
*/
declare function validateToonPatch(toonPatch: string, document?: any): boolean;
/**
* Applies a TOON Patch to a document.
*/
declare function applyToonPatch<T>(document: T, toonPatch: string, mutateDocument?: boolean): PatchResult<T>;
//#endregion
//#region src/llm.d.ts
/**
* Example prompt for generating TOON Patches from natural language instructions.
*/
declare const generateToonPatchPrompt = "\nYou are an expert at generating TOON Patches for editing JSON documents.\n\nTOON Patch format: patches[N]{op,path,value,from}:\n  op1,path1,value1,from1\n  op2,path2,value2,from2\n\nOperations: add, remove, replace, move, copy, test\n- add: requires value\n- remove: no value/from\n- replace: requires value\n- move: requires from\n- copy: requires from\n- test: requires value\n\nExample:\npatches[2]{op,path,value}:\n  add,/user/name,\"John\"\n  replace,/user/age,30\n\nGenerate a TOON Patch for: {instruction}\n";
/**
* Example prompt for editing existing TOON documents.
*/
declare const editToonDocumentPrompt = "\nEdit this TOON document according to the instructions.\n\nCurrent document:\n{toonDocument}\n\nInstructions: {instructions}\n\nOutput the updated TOON document.\n";
/**
* Example prompt for applying TOON Patches.
*/
declare const applyToonPatchPrompt = "\nApply this TOON Patch to the document.\n\nDocument: {document}\nPatch: {toonPatch}\n\nOutput the result.\n";
//#endregion
export { Operation, PatchResult, Validator, applyToonPatch, applyToonPatchPrompt, editToonDocumentPrompt, fromToonPatch, generateToonPatchPrompt, toToonPatch, validateToonPatch };