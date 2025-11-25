import { decode, encode } from "@toon-format/toon";
import { applyPatch, validate } from "fast-json-patch";

//#region src/patch.ts
/**
* Converts a JSON Patch array to TOON Patch string.
* Wraps in { patches: [...] } for indented object list format.
*/
function toToonPatch(patch) {
	return encode({ patches: patch });
}
/**
* Converts a TOON Patch string to JSON Patch array.
*/
function fromToonPatch(toonPatch) {
	return decode(toonPatch).patches;
}
/**
* Validates a TOON Patch string.
* Returns true if valid, throws error if invalid.
*/
function validateToonPatch(toonPatch, document) {
	validate(fromToonPatch(toonPatch), document);
	return true;
}
/**
* Applies a TOON Patch to a document.
*/
function applyToonPatch(document, toonPatch, mutateDocument = true) {
	return applyPatch(document, fromToonPatch(toonPatch), mutateDocument);
}

//#endregion
//#region src/llm.ts
/**
* Example prompt for generating TOON Patches from natural language instructions.
*/
const generateToonPatchPrompt = `
You are an expert at generating TOON Patches for editing JSON documents.

TOON Patch format: patches[N]{op,path,value,from}:
  op1,path1,value1,from1
  op2,path2,value2,from2

Operations: add, remove, replace, move, copy, test
- add: requires value
- remove: no value/from
- replace: requires value
- move: requires from
- copy: requires from
- test: requires value

Example:
patches[2]{op,path,value}:
  add,/user/name,"John"
  replace,/user/age,30

Generate a TOON Patch for: {instruction}
`;
/**
* Example prompt for editing existing TOON documents.
*/
const editToonDocumentPrompt = `
Edit this TOON document according to the instructions.

Current document:
{toonDocument}

Instructions: {instructions}

Output the updated TOON document.
`;
/**
* Example prompt for applying TOON Patches.
*/
const applyToonPatchPrompt = `
Apply this TOON Patch to the document.

Document: {document}
Patch: {toonPatch}

Output the result.
`;

//#endregion
export { applyToonPatch, applyToonPatchPrompt, editToonDocumentPrompt, fromToonPatch, generateToonPatchPrompt, toToonPatch, validateToonPatch };