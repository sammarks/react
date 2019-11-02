import { updateWidgetWeight } from './weights'
import { Widgets } from '../types'

describe('#updateWidgetWeight()', () => {
  let widgets: Widgets
  let result: Widgets
  beforeEach(() => {
    widgets = [
      {
        type: 'MarkdownContent',
        id: 'one',
        weight: 0,
        config: {},
        childGroups: {
          one: [
            { type: 'MarkdownContent', id: 'two', weight: 0, config: {} },
            { type: 'MarkdownContent', id: 'three', weight: 1, config: {} },
          ],
          two: [
            { type: 'MarkdownContent', id: 'four', weight: 0, config: {} },
            { type: 'MarkdownContent', id: 'five', weight: 1, config: {} },
          ],
        },
      },
    ]
  })
  describe('when the widget was not moved', () => {
    beforeEach(() => {
      result = updateWidgetWeight('one', widgets, 'three', {
        parentId: 'one-one',
        weight: 1,
      })
    })
    it('does nothing', () => {
      expect(result.length).toEqual(1)
      expect(result[0].childGroups!['one']!.length).toEqual(2)
      expect(result[0].childGroups!['one']![0].id).toEqual('two')
      expect(result[0].childGroups!['one']![1].id).toEqual('three')
    })
  })
  describe('when the widget cannot be found', () => {
    it('throws an error', () => {
      expect(() =>
        updateWidgetWeight('one', widgets, 'ten', {
          parentId: 'one-one',
          weight: 1,
        }),
      ).toThrow("Widget 'ten' could not be moved because it could not be found.")
    })
  })
  describe('when moving the widget within the same parent', () => {
    beforeEach(() => {
      result = updateWidgetWeight('one', widgets, 'three', {
        parentId: 'one-one',
        weight: 0,
      })
    })
    it('updates the weights within the parent', () => {
      expect(result.length).toEqual(1)
      expect(result[0].childGroups!['one']!.length).toEqual(2)
      expect(result[0].childGroups!['one']![1].id).toEqual('two')
      expect(result[0].childGroups!['one']![1].weight).toEqual(1)
      expect(result[0].childGroups!['one']![0].id).toEqual('three')
      expect(result[0].childGroups!['one']![0].weight).toEqual(0)
    })
  })
  describe('when moving the widget to a new parent', () => {
    beforeEach(() => {
      result = updateWidgetWeight('one', widgets, 'three', {
        parentId: 'one-two',
        weight: 1,
      })
    })
    it('removes the widget from the old parent', () => {
      expect(result.length).toEqual(1)
      expect(result[0].childGroups!['one']!.length).toEqual(1)
      expect(result[0].childGroups!['one']![0].id).toEqual('two')
    })
    it('adjusts the weights accordingly', () => {
      expect(result[0].childGroups!['two']!.length).toEqual(3)
      expect(result[0].childGroups!['two']![0].id).toEqual('four')
      expect(result[0].childGroups!['two']![0].weight).toEqual(0)
      expect(result[0].childGroups!['two']![1].id).toEqual('three')
      expect(result[0].childGroups!['two']![1].weight).toEqual(1)
      expect(result[0].childGroups!['two']![2].id).toEqual('five')
      expect(result[0].childGroups!['two']![2].weight).toEqual(2)
    })
  })
  describe('when moving to the end of a different parent', () => {
    beforeEach(() => {
      result = updateWidgetWeight('one', widgets, 'three', {
        parentId: 'one-two',
        weight: 2,
      })
    })
    it('adjusts the weights accordingly', () => {
      expect(result[0].childGroups!['two']![0].id).toEqual('four')
      expect(result[0].childGroups!['two']![1].id).toEqual('five')
      expect(result[0].childGroups!['two']![2].id).toEqual('three')
    })
  })
  describe('when moving to the beginning of a different parent', () => {
    beforeEach(() => {
      result = updateWidgetWeight('one', widgets, 'three', {
        parentId: 'one-two',
        weight: 0,
      })
    })
    it('adjusts the weights accordingly', () => {
      expect(result[0].childGroups!['two']![0].id).toEqual('three')
      expect(result[0].childGroups!['two']![1].id).toEqual('four')
      expect(result[0].childGroups!['two']![2].id).toEqual('five')
    })
  })
  describe('when moving past the end of a different parent', () => {
    beforeEach(() => {
      result = updateWidgetWeight('one', widgets, 'three', {
        parentId: 'one-two',
        weight: 10,
      })
    })
    it('adjusts the weights accordingly', () => {
      expect(result[0].childGroups!['two']![0].id).toEqual('four')
      expect(result[0].childGroups!['two']![1].id).toEqual('five')
      expect(result[0].childGroups!['two']![2].id).toEqual('three')
      expect(result[0].childGroups!['two']![2].weight).toEqual(2)
    })
  })
})
