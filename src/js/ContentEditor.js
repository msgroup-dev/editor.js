import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import ImageTool from '@editorjs/image';

import '../styles/bootstrap.less';

class ContentEditor {
  constructor(initProps) {
    const defaultProps = {
      containerEditorName: 'editorjs',
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
      },
      data: {}
    };

    const params = { ...defaultProps, ...initProps };

    if (!params.containerEditorName) throw new Error('Please, set container editorJS.');

    this.containerEditorName = params.containerEditorName;
    this.editorJS = null;
    this.params = params;

    this.init();
  }

  init() {
    this.editorJS = new EditorJS({
      holder: this.containerEditorName,
      tools: this.params.tools,
      data: this.params.data,
    });
  }
}

export default ContentEditor;
