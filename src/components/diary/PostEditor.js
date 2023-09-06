import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

const PostEditor = ({editorRef}) => {
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ]
  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={' '}
        hideModeSwitch={true}
        toolbarItems={toolbarItems}
        height='50vh'
        initialEditType='wysiwyg'
        useCommandShortcut={true}
        />
    </>
  )
}

export default PostEditor