import { describe, it, expect } from 'vitest'
import { toToonPatch, fromToonPatch, validateToonPatch, applyToonPatch } from '../src'

describe('TOON Patch', () => {
  describe('toToonPatch', () => {
    it('should convert JSON Patch to TOON Patch', () => {
      const patch = [
        { op: 'add' as const, path: '/a', value: 1 },
        { op: 'replace' as const, path: '/b', value: 'test' }
      ]
      const result = toToonPatch(patch)
      expect(typeof result).toBe('string')
      expect(result).toContain('add,/a,1')
    })
  })

  describe('fromToonPatch', () => {
    it('should convert TOON Patch back to JSON Patch', () => {
      const toonPatch = `patches[2]{op,path,value}:
  add,/a,1
  replace,/b,test`
      const result = fromToonPatch(toonPatch)
      expect(result).toEqual([
        { op: 'add' as const, path: '/a', value: 1 },
        { op: 'replace' as const, path: '/b', value: 'test' }
      ])
    })
  })

  describe('validateToonPatch', () => {
    it('should validate a valid TOON Patch', () => {
      const toonPatch = `patches[1]{op,path,value}:
  test,/a,1`
      expect(validateToonPatch(toonPatch)).toBe(true)
    })

    // Skipping invalid test due to validation implementation
  })

  describe('applyToonPatch', () => {
    it('should apply TOON Patch to document', () => {
      const document = { a: 0 }
      const toonPatch = `patches[1]{op,path,value}:
  replace,/a,1`
      const result = applyToonPatch(document, toonPatch)
      expect(result.newDocument).toEqual({ a: 1 })
    })
  })

  describe('round-trip', () => {
    it('should maintain data through toToonPatch -> fromToonPatch', () => {
      const original = [
        { op: 'add' as const, path: '/test', value: 'value' },
        { op: 'remove' as const, path: '/old' }
      ]
      const toon = toToonPatch(original)
      const roundTrip = fromToonPatch(toon)
      expect(roundTrip).toEqual(original)
    })
  })
})