import React from 'react'

export interface ConfirmCloseConfig {
  changeEvent?: string
}

export interface ChangeHandler {
  (...args: any[]): void
}

export interface RequiredProps {
  onClose: () => void

  [key: string]: any
}

export interface InjectedProps {
  onDirty: () => void
}

export interface ExternalProps {
  onDirty?: () => void
  onClean?: () => void
}

export type ConfirmCloseChildComponentProps<P extends RequiredProps> = P & InjectedProps
export type ConfirmCloseChildComponent<P extends RequiredProps> =
  | React.FC<ConfirmCloseChildComponentProps<P>>
  | React.ComponentClass<ConfirmCloseChildComponentProps<P>>
export type ConfirmCloseComponentProps<P extends RequiredProps> = P & ExternalProps
export type ConfirmCloseComponent<P extends RequiredProps> = React.FC<ConfirmCloseComponentProps<P>>
