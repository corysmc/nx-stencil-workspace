/* eslint-disable import/no-extraneous-dependencies */
import { getCustomElements, isValidComponent, isValidMetaData } from '@storybook/web-components';
import { ArgTypes } from '@storybook/api';
import { logger } from '@storybook/client-logger';
import * as _ from 'lodash/array';
 
export interface TagItem {
  fieldName: string; // this is the camelCased name of the property
  name?: string;
  type?: 'array' | 'boolean' | 'number' | 'object' | 'enum' | 'string' | string;
  description: string;
  required?: boolean;
  default?: any;
  defaultValue?: any;
}
export interface Tag {
  name: string;
  description: string;
  attributes?: TagItem[];
  properties?: TagItem[];
  events?: TagItem[];
  methods?: TagItem[];
  slots?: TagItem[];
  cssProperties?: TagItem[];
  dependencies?: string[];
  dependents?: string[];
}
export interface CustomElements {
  tags: Tag[];
  [key: string]: unknown;
}

function mapData(data: TagItem[] | undefined, category: string): ArgTypes | undefined {
  return (
    data &&
    data.reduce((acc, item) => {
      let objName = category;

      if ((item.name && item.name.length) || category !== 'attributes') {
        objName+= '.' + item.name;
        acc[objName] = {
          name: item.name,
          required: false,
          description: item.description,
          type: { name: 'void' },
          table: {
            category,
            type: { summary: item.type },
            defaultValue: {
              summary: item.default !== undefined ? item.default : item.defaultValue,
            },
          },
        };
      }
      if (category === 'properties' || category === 'attributes') {
        acc[objName].type = { name: item.type, required: item.required };
        acc[objName].control = { ...generateControlType(item) };
      }
      if (category === 'css') {
        acc[objName].type = { name: item.name.match('color') ? 'color' : 'text', required: false };
        acc[objName].control = item.name.match('color') ? { type: 'color' } : { type: 'text' };
      }
      return acc;
    }, {} as ArgTypes)
  );
  function generateControlType(item: TagItem): { type: string; options?: (string | undefined)[] } {
    switch (item.type) {
      case 'string':
        return { type: 'text' };
      case 'array':
        return { type: 'array' };
      case 'boolean':
        return { type: 'boolean' };
      case 'number':
        return { type: 'number' };
      case 'object':
        return { type: 'object' };
      case 'enum':
        // maybe we can do it otherwise?
        return { type: 'text' };
      default:
        if (item.type.indexOf('[]') > -1) {
          return generateControlType({ ...item, type: 'object' });
        }
        if (item.defaultValue?.indexOf('{}') > -1) {
          return generateControlType({ ...item, type: 'object' });
        }
        const options = item.type?.split('|');
        if (options && options.length > 1) {
          let foundTypes = [];
          const trimmedOptions = options.map((x) => {
            const trimmedX = x.trim();
            const tmp = (trimmedX.replace(/"/g, '') as string).trim();
            if (tmp === trimmedX && isScalar(trimmedX)) {
              foundTypes.push(trimmedX);
            }
            return tmp;
          });
          foundTypes = _.uniq(foundTypes);
          const newType =
            foundTypes.find((x) => x === 'string') ||
            foundTypes.find((x) => x === 'number') ||
            foundTypes.find((x) => x === 'boolean');
          if (newType) {
            return generateControlType({ ...item, type: newType });
          }
          return {
            type: options.length > 3 ? 'select' : 'radio',
            options: trimmedOptions,
          };
        } else {
          return { type: 'void' };
        }
    }
    function isScalar(typeString: string): boolean {
      switch (typeString) {
        case 'string':
        case 'number':
        case 'boolean':
          return true;
        default:
          return false;
      }
    }
  }
}

const getMetaData = (tagName: string, customElements: CustomElements) => {
  if (!isValidComponent(tagName) || !isValidMetaData(customElements)) {
    return null;
  }
  const metaData = customElements.tags.find(
    (tag) => tag.name.toUpperCase() === tagName.toUpperCase()
  );
  if (!metaData) {
    logger.warn(`Component not found in custom-elements.json: ${tagName}`);
  }
  return metaData;
};

export const extractArgTypesFromElements = (tagName: string, customElements: CustomElements) => {
  const metaData = getMetaData(tagName, customElements);
  return (
    metaData && {
      ...mapData(metaData.attributes, 'attributes'),
      ...mapData(metaData.properties, 'properties'),
      ...mapData(metaData.events, 'events'),
      ...mapData(metaData.slots, 'slots'),
      ...mapData(metaData.cssProperties, 'css'),
      ...mapData(metaData.methods, 'methods')
    }
  );
};

export const extractArgTypes = (tagName: string) => {
  console.log('tagName', tagName);
  return extractArgTypesFromElements(tagName, getCustomElements());
};

export const extractComponentDescription = (tagName: string) => {
  const metaData = getMetaData(tagName, getCustomElements());
  return metaData && metaData.description;
};