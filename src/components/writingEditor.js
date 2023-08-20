import { Editor } from "@toast-ui/react-editor";
import "@toast-ui/editor/dist/toastui-editor.css";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor/dist/i18n/ko-kr";

export default function TostEditor() {
  return (
    <Editor
      initialValue=" "
      initialEditType="wysiwyg"
      placeholder="내용을 입력해주세요."
      previewStyle="tab"
      height="420px"
      toolbarItems={[
        ["heading", "bold", "italic", "strike"],
        ["hr", "quote"],
        ["ul", "ol", "task", "indent", "outdent"],
        ["image", "link"],
        ["code", "codeblock"],
      ]}
      plugins={[colorSyntax]}
      useCommandShortcut={false}
      language="ko-KR"
    ></Editor>
  );
}
