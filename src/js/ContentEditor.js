import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import CustomMarker from './CustomPlugins/CustomMarker';
import ImageTool from '@editorjs/image';

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
          class: CustomMarker,
          shortcut: 'CMD+SHIFT+M',
        },
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
