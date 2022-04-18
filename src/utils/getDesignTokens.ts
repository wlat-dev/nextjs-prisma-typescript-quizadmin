import { colors, PaletteMode } from "@mui/material";
import { grey, indigo, blue } from "@mui/material/colors";

const getDesignTokens = (mode: PaletteMode) => (
  {
  palette: {
    mode,
  },
});

export default getDesignTokens;
