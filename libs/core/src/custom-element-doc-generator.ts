/**
 * Stencil Doc Outputs don't seem to support custom-elements.json as suggested
 * here: https://github.com/w3c/webcomponents/issues/776#issuecomment-536749457.
 * This generator implements this standard, which is used by Storybook to display
 * documentation.
 */
export async function generateJsonDocs(
  config,
  compilerCtx,
  _buildCtx,
  docsData
) {
  console.log('generate custom element docs');
  const jsonOutputTargets = config.outputTargets.filter(
    isOutputTargetCustomElementDocsJson
  );
  const { components, ...docsDataWithoutComponents } = docsData;
  const json = {
    ...docsDataWithoutComponents,
    tags: docsData.components.map((component) => ({
      name: component.tag,
      path: component.filePath,
      description: component.docs,

      attributes: component.props
        .filter((prop) => prop.attr)
        .map((prop) => ({
          name: prop.attr,
          type: prop.type,
          description: prop.docs,
          default: prop.default,
          required: prop.required
        })
      ),

      properties: component.props
        .filter((prop) => !prop.attr)
        .map((prop) => ({
          name: prop.name,
          type: prop.type,
          description: prop.docs,
          defaultValue: prop.default,
          required: prop.required,
        })
      ),

      events: component.events.map((event) => ({
        name: event.event,
        description: event.docs,
      })),

      methods: component.methods.map((method) => ({
        name: method.name,
        description: method.docs + ' \
        `'+ method.signature +'`',
        signature: method.signature,
      })),

      slots: component.slots.map((slot) => ({
        name: slot.name,
        description: slot.docs,
      })),

      cssProperties: component.styles
        .filter((style) => style.annotation === 'prop')
        .map((style) => ({
          name: style.name,
          description: style.docs,
        })),

      cssParts: component.parts.map((part) => ({
        name: part.name,
        description: part.docs,
      }))
    }))
  };
  const jsonContent = JSON.stringify(json, null, 2);
  await Promise.all(
    jsonOutputTargets.map(() => {
      return writeDocsOutput(compilerCtx, jsonContent, config.rootDir);
    })
  );
}

function isOutputTargetCustomElementDocsJson(o) {
  return o.name === "custom-element-docs";
}

export async function writeDocsOutput(
  compilerCtx,
  jsonContent: string,
  root: string
) {
  return compilerCtx.fs.writeFile(
    `${root}/custom-elements.json`,
    jsonContent
  );
}
