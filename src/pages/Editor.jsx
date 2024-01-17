import { createReactEditorJS } from 'react-editor-js';
import { EDITOR_JS_TOOLS } from '../Constant';

const ReactEditorJS = createReactEditorJS();

function Editor() {
  return (
    <ReactEditorJS
      tools={EDITOR_JS_TOOLS}
      defaultValue={{
        time: new Date().getTime(),
        blocks: [],
      }}
    />
  );
}

export default Editor;
