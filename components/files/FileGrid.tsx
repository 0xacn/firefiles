import { Box, Flex, Image, Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import OptionsPopover from "@components/popups/OptionsPopover";
import { download } from "@util/helpers";
import { StorageReference } from "firebase/storage";
import prettyBytes from "pretty-bytes";
import React from "react";
import { Copy, FileDownload, FileMinus } from "tabler-icons-react";
import FileIcon from "./FileIcon";

interface Props {
	file: StorageReference;
	data: any;
	onPreviewOpen: () => void;
	copyFile: () => void;
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
	file_url: string;
	id: string;
}

const FileGrid: React.FC<Props> = (props) => {
	const optionProps = {
		p: 2,
		cursor: "pointer",
		_hover: { backgroundColor: useColorModeValue("gray.100", "rgba(237, 242, 247, 0.1)") },
	};

	return (
		<>
			<Flex
				cursor="pointer"
				direction="column"
				align="center"
				borderWidth="1px"
				borderRadius="lg"
				boxShadow="5.5px 4.2px 7.8px -1.7px rgba(0, 0, 0, 0.1)"
				transition="ease-in-out 0.1s"
				className="hoverAnim"
				w="100%"
				h="140px"
				overflow="hidden"
			>
				<Box w="100%" h="100px" overflow="hidden" onClick={props.onPreviewOpen}>
					{props.data?.contentType.startsWith("image") ? (
						<Image
							src={`${props.file_url}?alt=media&token=${props.data?.downloadTokens}`}
							alt={props.file.name}
							w="full"
							h="full"
							objectFit="cover"
						/>
					) : (
						<Box display="flex" alignItems="center" justifyContent="center" h="full">
							<FileIcon extension={props.file.name.split(".").pop()} id={props.id} bigIcon={true} />
						</Box>
					)}
				</Box>
				<Flex p="2" w="full" justify="space-between" alignItems="center">
					<Text
						flex="1"
						isTruncated={true}
						as="p"
						fontSize="xs"
						align="left"
						px="2"
						onClick={props.onPreviewOpen}
					>
						{props.file.name}
					</Text>
					<OptionsPopover
						header={props.file.name}
						footer={`Size: ${props.data && prettyBytes(parseInt(props.data.size) || 0)}`}
					>
						{!props.data ? (
							<Spinner />
						) : (
							<Flex alignItems="stretch" flexDirection="column">
								<Flex {...optionProps} onClick={props.copyFile}>
									<Copy />
									<Text ml="2">Share</Text>
								</Flex>
								<Flex
									{...optionProps}
									onClick={() =>
										download(
											props.file.name,
											`${props.file_url}?alt=media&token=${props.data?.downloadTokens}`
										)
									}
								>
									<FileDownload />
									<Text ml="2">Download</Text>
								</Flex>
								<Flex {...optionProps} onClick={() => props.setIsOpen(true)}>
									<FileMinus />
									<Text ml="2">Delete</Text>
								</Flex>
							</Flex>
						)}
					</OptionsPopover>
				</Flex>
			</Flex>
		</>
	);
};

export default FileGrid;
