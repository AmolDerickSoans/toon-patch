// LLM Prompt Recipes for TOON Patch Generation and Editing

/**
 * Example prompt for generating TOON Patches from natural language instructions.
 */
export const generateToonPatchPrompt = `
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
export const editToonDocumentPrompt = `
Edit this TOON document according to the instructions.

Current document:
{toonDocument}

Instructions: {instructions}

Output the updated TOON document.
`;

/**
 * Example prompt for applying TOON Patches.
 */
export const applyToonPatchPrompt = `
Apply this TOON Patch to the document.

Document: {document}
Patch: {toonPatch}

Output the result.
`;