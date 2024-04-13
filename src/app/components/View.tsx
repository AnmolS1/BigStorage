import { useEffect, useState } from "react";

import Grid from '@mui/material/Unstable_Grid2';

import Alerter from "./Alerter";
import FileView from "./FileView";
import view from '../styles/View.module.css';

export default function View() {
	const [files, setFiles] = useState<any[]>([]);
	
	const [showAlert, setShowAlert] = useState(false);
	const [alertInfo, setAlertInfo] = useState(['', '', '']);
	
	const getFiles = async () => {
		const response = await fetch('/api/list-objects', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ username: localStorage.getItem('username') })
		});
		
		if (response.ok) {
			var tempContents: any[] = (await response.json()).Contents;
			tempContents = tempContents.filter(e => e.Size > 0);
			tempContents.forEach(e => { e.Key = e.Key.substring(e.Key.indexOf('/') + 1) });
			
			setFiles(tempContents);
		} else {
			setShowAlert(true);
			setAlertInfo(['error', 'file retrieval failed', 'failed to retrieve files for unknown reason, please try again later']);
		}
	};
	
	useEffect(() => { getFiles() }, []);
	
	return (
		<>
			<Alerter onClose={() => setShowAlert(false)} open={showAlert} severity={alertInfo[0]} title={alertInfo[1]} message={alertInfo[2]} ></Alerter>
			
			{ files && (
				<Grid container spacing={2} className={view.file_card_container}>
					{ Array.from(files).map((file: any) => {
						return (
							<Grid key={file.ETag} xs="auto">
								<FileView file={file} />
							</Grid>
						);
					}) }
				</Grid>
			) }
		</>
	);
}