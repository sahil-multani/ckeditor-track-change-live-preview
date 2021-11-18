import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';
import { patienceDiff } from './diff';
const App = () => {
	const [editor, setEditor] = useState('asas');
	const [data, setdata] = useState('');
	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	const prevState = usePrevious(editor) || '';
	useEffect(() => {
		// console.log(prevState, editor);
		let a = prevState;

		let b = editor;

		let difference = patienceDiff(a.split(''), b.split(''));
		console.log(difference.lines);
		let len = difference.lines.length;
		difference.lines.forEach((line, index) => {
			if (line.aIndex === -1) {
				console.log("<span class='highlight>", b, '</span>');
				setdata(`<div class="highlight">${b}</div>`);
			}
		});
	}, [editor]);
	var myHTML = "<div><h1>Jimbo.</h1>\n<p>That's what she said</p></div>";

	var strippedHtml = editor.replace(/<[^>]+>/g, '');

	// Jimbo.
	// That's what she said
	// console.log(strippedHtml);
	return (
		<div className='App'>
			<CKEditor
				editor={ClassicEditor}
				data='<p>start typing ....</p>'
				onChange={(event, editor) => {
					const data = editor.getData();
					setEditor(data);
				}}
			/>

			<div> {ReactHtmlParser(data)}</div>
		</div>
	);
};

export default App;
