import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import Marker from './CustomPlugins/Marker';
import Color from './CustomPlugins/Color';
import Underline from './CustomPlugins/Underline';
import Delete from './CustomPlugins/Delete';
import FontSize from './CustomPlugins/FontSize';

import '../styles/bootstrap.less';

class ContentEditor {
  constructor(initProps) {
    const defaultProps = {
      holder: 'editorjs',
      tools: {
        header: {
          class: Header,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
        embed: {
          class: Embed,
          inlineToolbar: ['false'],
          config: {
            services: {
              youtube: true
            }
          }
        },
        image: {
          class: ImageTool,
        },
        marker: {
          class: Marker,
          shortcut: 'CMD+SHIFT+M',
        },
        color: {
          class: Color,
          shortcut: 'CMD+SHIFT+C',
        },
        underline: Underline,
        delete: Delete,
        size: FontSize,
      },
      data: {},
    };

    this.editorJS = null;

    this.plugins = {
      header: Header,
      list: List,
      embed: Embed,
      imageTool: ImageTool,
      marker: Marker,
      color: Color,
      underline: Underline,
      delete: Delete,
      fontSize: FontSize,
    };

    this.defaultParams = defaultProps;
    this.initParams = initProps;
    this.params = null;

    this.init();
  }

  init() {
    this.choiceProps();
    this.editorJS = new EditorJS({ ...this.params });
  }

  choiceProps() {
    if (!this.initParams || !Object.keys(this.initParams).length || !this.initParams.tools) {
      this.params = this.defaultParams;
      return;
    }

    if (!this.initParams.holder) {
      throw new Error('Please, set container editorJS.');
    }

    this.connectPlugins();
    this.params = this.initParams;
  }

  connectPlugins() {
    const keysTools = Object.keys(this.initParams.tools);

    keysTools.forEach((key) => {
     this.initParams.tools[key].class = this.plugins[key];
    });
  }
}

export default ContentEditor;
