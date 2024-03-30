import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Collapse from "@mui/material/Collapse";
import IconButton from '@mui/material/IconButton';

import CloseIcon from '@mui/icons-material/Close';

import { useEffect, useState } from 'react';

interface AlertProps {
	open: boolean;
	severity: any;
	title: string;
	message: string;
	onClose: () => void;
}

export default function Alerter({open, severity, title, message, onClose}: AlertProps) {
	const [on, setOn] = useState(open);
	
	const handleClose = () => { setOn(false); onClose(); }
	useEffect(() => {setOn(open)}, [open]);
	
	return (
		<Collapse in={on} sx={{
			position: 'absolute',
			left: { xs: '10%', md: '25%' },
			width: { xs: '80%', md: '50%' },
			zIndex: 4
		}}>
			<Alert severity={severity} action={
				<IconButton aria-label="close" color="inherit" size="small" onClick={handleClose}>
					<CloseIcon fontSize="inherit" />
				</IconButton>
			}>
				<AlertTitle>{title}</AlertTitle>
				{message}
			</Alert>
		</Collapse>
	);
}