import * as _ from 'lodash';

function isComputedStyle(data) {
  return (
    _.isObject(data) &&
    data.hasOwnProperty("type") &&
    data.hasOwnProperty("value")
  );
}

function computeStyle({ type, value }, context) {
  let compute;
  switch (type) {
    case "context":
      return _.get(context, value);
    case "expression":
      let localVars = "";
      Object.keys(context).map(varName => {
        localVars += `var ${varName}=context['${varName}'];`;
      });
      eval(`compute = () => { ${localVars} return ${value}; }`);
      return compute();
  }
  return value;
}

export function compileTheme(definitions, context) {
  _.each(definitions, (value, key) => {
    if (_.isObject(value)) {
      if (isComputedStyle(value)) {
        definitions[key] = computeStyle(value, context);
      } else {
        definitions[key] = compileTheme(value, context);
      }
    }
  });
  return definitions;
}