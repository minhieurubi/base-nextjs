import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { uploadImageToCloudinary } from "@/lib/uploadImage";
import { toast } from "react-toastify";
import { userApi } from "@/services/api";
import { getAxiosErrorMessage } from "@/helper/common";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setUserInfo } from "@/lib/slices/userSlice";

interface AvatarWithModalProps {
  initialAvatar?: string;
  size?: number;
}

const AvatarWithModal: React.FC<AvatarWithModalProps> = ({
  initialAvatar,
  size = 80,
}) => {
  const { t } = useTranslation('common');
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setSelectedFile(null);
    setPreview(initialAvatar);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      const maxSize = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSize) {
        toast.warning(t("file_over_2mb"));
        return;
      }

      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (selectedFile) {
      const url = await uploadImageToCloudinary(selectedFile);
      if (!url) {
        toast.warning(t("unable_to_upload_image"));
        return;
      }
      setPreview(url);
      try {
        const res = await userApi.updateUserInfo({ urlAvatar: url });
        dispatch(setUserInfo(res.data));
      } catch (error) {
        toast.error(getAxiosErrorMessage(t(`${error}`)));
      }
    }
    setIsLoading(false);
    handleClose();
  };

  useEffect(() => {
    if (initialAvatar) {
      setPreview(initialAvatar);
    }
  }, [initialAvatar]);

  return (
    <Box>
      <IconButton onClick={handleOpen} sx={{ p: 0 }}>
        <Avatar
          src={preview}
          sx={{ width: size, height: size, cursor: "pointer" }}
        />
      </IconButton>

      <Dialog
        open={open}
        slotProps={{
          paper: {
            sx: { width: 400, maxWidth: "90%" },
          },
        }}
      >
        <DialogTitle>Avatar</DialogTitle>
        <DialogContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            gap={2}
            mt={1}
          >
            <Avatar
              src={preview}
              sx={{ width: 250, height: 250 }}
            />

            <Button
              variant="contained"
              component="label"
              startIcon={<PhotoCameraIcon />}
              disabled={isLoading}
            >
              {t("upload_image")}
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={handleFileChange}
              />
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSave}
            variant="contained"
            disabled={!selectedFile || isLoading}
          >
            {t("save")}
          </Button>
          <Button onClick={handleClose} disabled={isLoading}>{t('cancel')}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AvatarWithModal;
