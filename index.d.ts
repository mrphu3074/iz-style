declare module 'iz-style' {
  export interface ITheme {
    context: Object;
    definitions: Object;
  }
  export interface StyleProviderProps {
    theme: ITheme;
  }
  export function compileTheme(theme): any;
  export class StyleProvider extends React.Component<StyleProviderProps, any> { }
}