import { decode, encode } from '@toon-format/toon'
import { applyPatch, validate as validateJsonPatch } from 'fast-json-patch'
import type { Operation, PatchResult } from './types'

/**
 * Converts a JSON Patch array to TOON Patch string.
 * Wraps in { patches: [...] } for indented object list format.
 */
export function toToonPatch(patch: Operation[]): string {
  return encode({ patches: patch })
}

/**
 * Converts a TOON Patch string to JSON Patch array.
 */
export function fromToonPatch(toonPatch: string): Operation[] {
  const decoded = decode(toonPatch) as { patches: Operation[] }
  return decoded.patches
}

/**
 * Validates a TOON Patch string.
 * Returns true if valid, throws error if invalid.
 */
export function validateToonPatch(toonPatch: string, document?: any): boolean {
  const patch = fromToonPatch(toonPatch)
  validateJsonPatch(patch, document)
  return true
}

/**
 * Applies a TOON Patch to a document.
 */
export function applyToonPatch<T>(document: T, toonPatch: string, mutateDocument = true): PatchResult<T> {
  const patch = fromToonPatch(toonPatch)
  const result = applyPatch(document, patch, mutateDocument)
  return result
}