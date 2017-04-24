import * as React from 'react';
import * as _ from 'lodash';
import { StyleProvider as ShoutemStyleProvider } from '@shoutem/theme';
import { compileTheme } from './compileTheme';
export interface ITheme {
  definitions: Object;
  context: Object;
}
export interface StyleProviderProps {
  theme: ITheme,
}

export class StyleProvider extends React.PureComponent<StyleProviderProps, any> {
  constructor(props: StyleProviderProps) {
    super(props);
    let theme = {};
    if (props.theme) {
      const isValidTheme = !!props.theme.context && !!props.theme.definitions;
      if (isValidTheme) {
        theme = compileTheme(props.theme.definitions, props.theme.context);
      }
    }
    this.state = { theme };
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(this.props.theme, nextProps.theme)) {
      const theme = compileTheme(
        nextProps.theme.definitions,
        nextProps.theme.context
      );
      this.setState({ theme });
    }
  }
  render() {
    return (
      <ShoutemStyleProvider style={this.state.theme}>
        {this.props.children}
      </ShoutemStyleProvider>
    );
  }
}