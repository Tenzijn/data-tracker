import EditorJs from '@editorjs/editorjs';
import { useRef, useEffect, useState } from 'react';
import { EDITOR_JS_TOOLS } from '../Constant';
import '../style/EditorComponent.scss';
import { Timestamp } from 'firebase/firestore';
import { Button } from '@chakra-ui/react';

function EditorComponent({ submitData, closeModel, data, setEdit }) {
  const blockContent = data?.blocks || [
    {
      type: 'header',
      data: {
        text: 'Dear Dairy',
        level: 1,
      },
    },
  ];
  const DEFAULT_INITIAL_DATA = {
    time: Timestamp.now(),
    blocks: blockContent,
  };
  const [btnText, setBtnText] = useState('save');
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
        <Button
          w='100%'
          colorScheme='blue'
          className='btn btn-save'
          onClick={async () => {
            try {
              const savedData = await ejInstance.current.save();
              submitData(savedData);
              closeModel();
            } catch {
              console.log('error');
            }
            setBtnText('saved');
            setEdit(null);
          }}
        >
          {btnText}
        </Button>
      </div>
    </>
  );
}

export default EditorComponent;
