import "./Editor.css"

function Editor({ text, setText }){

    return (
        <div className="editor-div">
            <textarea 
                id="editor" 
                value={text} 
                onChange={(e) => setText(e.target.value)}
            >
            </textarea>
        </div>
    );
}

export default Editor;