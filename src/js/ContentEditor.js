import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import ImageTool from '@editorjs/image';
import Marker from './CustomPlugins/Marker';
import Color from './CustomPlugins/Color';
import Underline from './CustomPlugins/Underline';
import Delete from './CustomPlugins/Delete';

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
      },
    };

    const params = { ...defaultProps, ...initProps };

    if (!params.holder) throw new Error('Please, set container editorJS.');

    this.editorJS = null;
    this.params = params;

    this.init();
  }

  init() {
    this.editorJS = new EditorJS({ ...this.params });
  }
}

export default ContentEditor;
