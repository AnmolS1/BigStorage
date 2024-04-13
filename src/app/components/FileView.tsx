import { SetStateAction, useEffect, useState } from "react";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import VideocamIcon from '@mui/icons-material/Videocam';
import GraphicEqIcon from '@mui/icons-material/GraphicEq';
import ImageIcon from '@mui/icons-material/Image';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import view from '../styles/View.module.css';

interface FileViewProps {
	file: any
}

export default function FileView({ file }: FileViewProps) {
	const [icon, setIcon] = useState(<InsertDriveFileIcon />);
	
	const imageTypes = ['jpeg', 'jpg', 'png'];
	const videoTypes = ['mov', 'mp4', 'mpeg'];
	const audioTypes = ['mp3', 'aac', 'wav'];
	
	const [anchorEl, setAnchorEl] = useState(null);
	const open = Boolean(anchorEl);
	
	const openSettingsMenu = (event: any) => {
		setAnchorEl(event.currentTarget);
	};
	
	const closeSettingsMenu = () => {
		setAnchorEl(null);
	}
	
	useEffect(() => {
		const extension = file.Key.split('.').pop();
		if (!extension) {
			return;
		} else if (imageTypes.includes(extension)) {
			setIcon(<ImageIcon />);
		} else if (videoTypes.includes(extension)) {
			setIcon(<VideocamIcon />);
		} else if (audioTypes.includes(extension)) {
			setIcon(<GraphicEqIcon />);
		}
	}, [file]);
	
	return (
		<>
			<Card className={view.file_card}>
				<CardHeader
					avatar={ <Icon> { icon } </Icon> }
					action={
						<IconButton onClick={openSettingsMenu}>
							<MoreVertIcon />
						</IconButton>
					}
					title={ file.Key }
				/>
				<Menu
					anchorEl={anchorEl}
					open={open}
					onClose={closeSettingsMenu}
					MenuListProps={{ 'aria-labelledby': 'file-card-header' }}
				>
					<MenuItem onClick={() => {}}>download</MenuItem>
					<MenuItem onClick={() => {}}>delete</MenuItem>
				</Menu>
			</Card>
		</>
	);
}