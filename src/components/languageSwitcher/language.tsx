'use client';

import i18n from '@/app/i18n';
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { setLanguage } from "@/lib/slices/settings";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export const Language = () => {
  const dispatch = useDispatch();

  const lng = useSelector((state: RootState) => state.settings.lng);

  const handleChange = async (event: SelectChangeEvent) => {
    const value = event.target.value as string;
    dispatch(setLanguage(value));
    await i18n.changeLanguage(value);
  };

  return (
    <Select
      labelId="demo-simple-select-helper-label"
      id="demo-simple-select-helper"
      value={lng}
      onChange={handleChange}
      sx={{ height: '30px', width: '150px', fontSize: '14px' }}
    >
      <MenuItem value="vi">Việt</MenuItem>
      <MenuItem value="en">English</MenuItem>
      <MenuItem value="cn">中文</MenuItem>
    </Select>
  );
};
