import { Widget, Widgets } from '../types'

interface WidgetWithGroup extends Widget {
  groupName: string
}

const _findWidget = (
  parentId: string,
  widgets: Widgets,
  widgetId: string,
): WidgetWithGroup | undefined => {
  return widgets
    .map(widget => {
      if (widget.id === widgetId) return { ...widget, groupName: parentId }
      if (widget.childGroups) {
        return Object.keys(widget.childGroups)
          .map(childGroupKey => {
            return _findWidget(
              `${widget.id}-${childGroupKey}`,
              widget.childGroups ? widget.childGroups[childGroupKey] || [] : [],
              widgetId,
            )
          })
          .filter(Boolean)[0]
      }
    })
    .filter(Boolean)[0]
}

interface UpdateWidgetWeightOptsWithWeight extends UpdateWidgetWeightOpts {
  widget: Widget
}

const _updateWidgetWeight = (
  groupId: string,
  widgets: Widgets,
  opts: UpdateWidgetWeightOptsWithWeight,
) => {
  const { widget, parentId, weight } = opts
  let widgetInParent = false
  const result = widgets.reduce<Widgets>((acc, childWidget, index) => {
    const widgetId = childWidget.id
    if (widgetId === widget.id) {
      widgetInParent = true
      return acc
    }
    if (childWidget.childGroups) {
      childWidget.childGroups = Object.keys(childWidget.childGroups).reduce(
        (childGroups, childGroupKey) => ({
          ...childGroups,
          [childGroupKey]: _updateWidgetWeight(
            `${childWidget.id}-${childGroupKey}`,
            childWidget.childGroups![childGroupKey] || [],
            opts,
          ),
        }),
        {},
      )
    }
    if (groupId === parentId && index === weight) {
      if (index === 0 || !widgetInParent) return [...acc, widget, childWidget]
      else return [...acc, childWidget, widget]
    }
    return [...acc, childWidget]
  }, [])
  if (groupId === parentId && weight >= widgets.length) {
    result.push(widget)
  }
  return result.map((childWidget, index) => ({ ...childWidget, weight: index }))
}

export interface UpdateWidgetWeightOpts {
  // The parent to move the widget underneath.
  parentId: string
  // The new weight of the widget.
  weight: number
}

export const updateWidgetWeight = (
  rootGroupId: string,
  widgets: Widgets,
  widgetId: string,
  opts: UpdateWidgetWeightOpts,
) => {
  const widget = _findWidget(rootGroupId, widgets, widgetId)
  if (!widget) {
    throw new Error(`Widget '${widgetId}' could not be moved because it could not be found.`)
  }
  if (widget.groupName === opts.parentId && opts.weight === widget.weight) {
    return widgets
  }
  return _updateWidgetWeight(rootGroupId, widgets, {
    ...opts,
    widget,
  })
}
