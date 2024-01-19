import EditorJs from '@editorjs/editorjs';
import { useRef, useEffect } from 'react';
import { EDITOR_JS_TOOLS } from '../Constant';
import '../style/EditorComponent.scss';

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: 'header',
      data: {
        text: 'Dear Dairy',
        level: 1,
      },
    },
  ],
};

function EditorComponent() {
  const ejInstance = useRef(null);

  const initEditor = () => {
    const editor = new EditorJs({
      holder: 'editor-js',
      onReady: () => {
        ejInstance.current = editor; // Assign editor to ejInstance.current
      },
      autofocus: true,
      data: DEFAULT_INITIAL_DATA,
      tools: EDITOR_JS_TOOLS,
    });
  };
  useEffect(() => {
    if (ejInstance.current === null) {
      initEditor();
    }

    return () => {
      ejInstance?.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  return (
    <>
      <div>
        <div id='editor-js'></div>
      </div>
      <div>
        <button
          className='btn btn-save'
          onClick={async () => {
            try {
              const savedData = await ejInstance.current.save();
              console.log(savedData);
            } catch {
              console.log('error');
            }
          }}
        >
          Save
        </button>
      </div>
    </>
  );
}

export default EditorComponent;
