import "./Preview.css";
import { marked } from 'marked'; 

function Preview({ markdownText }) {
  const htmlContent = marked(markdownText); 

  return (
    <div
      id="preview"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    >
    </div>
  );
}

export default Preview;