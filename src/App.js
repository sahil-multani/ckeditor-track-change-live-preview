import React, { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ReactHtmlParser from 'react-html-parser';

import diff from './diffhtml';

let state = `
  <p>Hello Batman, decide what to do:</p>
  <table>
  <tbody>
  <tr>
  <td>s</td>
  <td>a</td>
  <td>b1</td>
  </tr>
  <tr>
  <td>s</td>
  <td>y</td>
  <td>x</td>
  </tr>
  <tr>
  <td>s</td>
  <td>1</td>
  <td>2</td>
  </tr>
  </tbody>
  </table>
  <ul><li>Kill The Joker</li><li>Save Thalia Al Gul</li><li>Save Gotham</li></ul><h4>I am a heading 4</h4>
`;
const App = () => {
	const [editor, setEditor] = useState(state);
	const [data, setdata] = useState('');
	function usePrevious(value) {
		const ref = useRef();
		useEffect(() => {
			ref.current = value;
		});
		return ref.current;
	}

	return (
		<div className='App'>
			<CKEditor
				editor={ClassicEditor}
				data={editor}
				onChange={(event, editor) => {
					const data = editor.getData();
					setEditor(data);
				}}
			/>

			<div> {ReactHtmlParser(diff(state, editor))}</div>
		</div>
	);
};

export default App;
