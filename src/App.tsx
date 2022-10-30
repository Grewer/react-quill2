import React, {useMemo, useRef, useState} from 'react';
import './App.css';
import ReactQuill, {Quill} from './react-quill/index';
import './react-quill/quill.snow.less';
import FindModal from "./FindModal";
import SearchedStringBlot from './SearchedString'
import TableUI from './modules/table';

// @ts-ignore
Quill.register(SearchedStringBlot);
Quill.register({ 'modules/tableUI': TableUI }, true);

const CustomButton = () => <span className="iconfont">
    find
</span>;

const CustomToolbar = () => <div id="toolbar">
    <select
        className="ql-header"
        defaultValue={''}
        onChange={(e) => e.persist()}
    >
        <option value="1"></option>
        <option value="2"></option>
        <option selected></option>
    </select>
    <button className="ql-bold"></button>
    <button className="ql-italic"></button>
    <button className="ql-showFindModal">
        <CustomButton/>
    </button>
    <button className="ql-insertTable">
        inert
    </button>
</div>


function App() {
    const [value, setValue] = useState('');
    const [visible, setVisible] = useState(false)
    const editorRef = useRef<any>()
    
    function showFindModal() {
        setVisible(true)
    }
    
    function insertTable() {
        const quill = editorRef.current?.editor
        if(quill){
            quill.focus();
            const table = quill.getModule('table');
            console.log(table);
            table.insertTable(3, 3);
        }
    }
    
    const modules = useMemo(() => ({
        toolbar: {
            container: '#toolbar',
            handlers: {
                showFindModal,
                insertTable
            }
        },
        table: true,
        tableUI: {},
    }), []);
    
    const _closeFindModal = () => setVisible(false)
    
    const getEditor = () => {
        return editorRef.current?.editor
    }
    
    return (<div className={'container'}>
        <CustomToolbar/>
        {/*@ts-ignore*/}
        <ReactQuill ref={editorRef} theme="snow" value={value} modules={modules} onChange={setValue}/>
        {visible ? (
            <FindModal
                closeFindModal={_closeFindModal}
                getEditor={getEditor}
            />
        ) : null}
    </div>)
}

export default App;
