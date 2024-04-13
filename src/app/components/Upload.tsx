import { ChangeEvent, useState } from "react";

import Stack from '@mui/system/Stack';
import IconButton from '@mui/material/IconButton';

import CloudUploadIcon from '@mui/icons-material/CloudUpload';

import Alerter from './Alerter';
import upload from '../styles/Upload.module.css';

export default function Upload() {
	const [files, setFiles] = useState<FileList | null>(null);
	const [uploading, setUploading] = useState(false);
	
	const [showAlert, setShowAlert] = useState(false);
	const [alertInfo, setAlertInfo] = useState(['', '', '']);
	
	const username = localStorage.getItem('username');
	
	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const temp = event.target.files;
		setFiles(temp && temp.length > 0 ? temp : null);
	};
	
	const handleUpload = async (_: any) => {
		setUploading(true);
		
		for (let i = 0; i < files!.length; i++) {
			const file = files!.item(i) as File;
			
			const response = await fetch('/api/upload', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ filename: username + '/' + file.name })
			});
			
			if (response.ok) {
				const { url, fields } = await response.json();
				
				const formData = new FormData();
				Object.entries(fields).forEach(([key, value]) => {
					formData.append(key, value as string);
				});
				formData.append('file', file);
				
				const uploadResponse = await fetch(url, { method: 'POST', body: formData });
				
				if (uploadResponse.ok) {
					console.log(`uploaded ${file.name} successfully`);
				} else {
					setShowAlert(true);
					setAlertInfo(['error', 'upload failed', `failed to upload ${file.name}`]);
					
					console.log(`failed to upload ${file.name}`);
					return;
				}
			} else {
				setShowAlert(true);
				setAlertInfo(['error', 'server error', 'sorry :/']);
				
				console.log('server error');
				return;
			}
		}
		
		setShowAlert(true);
		setAlertInfo(['success', 'Upload Successful!', 'all ur files are up in da cloud :)']);
		
		setFiles(null);
		setUploading(false);
	};
	
	return (
		<>
			<Alerter onClose={() => setShowAlert(false)} open={showAlert} severity={alertInfo[0]} title={alertInfo[1]} message={alertInfo[2]} ></Alerter>
			
			<div className={upload.uploadContainer}>
				<div id="file-input-form-group" className={upload.formGroup}>
					<label htmlFor="file-input">upload files here</label>
					
					<div id="file-input-container" className={upload.container}>
						<div id="file-input_target" className={upload.target}>
							<div id="file-input-box" className={upload.box}></div>
							{ !files && (
								<div id="file-input-instructions" className={upload.instructions}>
									<span id="file-input-drag-text">drag files here or </span>
									<span id="file-input-choose" className={upload.choose}>choose from folder</span>
								</div>
							) }
							{ files && (
								<>
									<div id="file-input-preview-heading" className={upload.previewHeading}>
										{files.length} file{files.length != 1 ? 's' : ''} selected <span className={upload.choose}>change files</span>
									</div>
									<div className={upload.previewContainer}>
										{ Array.from(files).map((file: File) => (
											<div key={file.name} id="field-input-preview" className={upload.preview}>
												<img className={upload.previewImage} src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
												{file.name}
											</div>
										)) }
									</div>
								</>
							) }
							<input id="file-input" className={upload.fileInput} type="file" multiple onChange={handleFileChange} />
						</div>
					</div>
				</div>
				
				<Stack className={upload.uploadBtnContainer}>
					<div className={upload.uploadBtnLine}></div>
					<IconButton disabled={!files || uploading} onClick={handleUpload} className={upload.uploadBtn} size="large">
						<CloudUploadIcon fontSize="inherit" />
					</IconButton>
					<div className={upload.uploadBtnLine}></div>
				</Stack>
			</div>
		</>
	);
}