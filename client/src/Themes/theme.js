import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./designtokens";
export const theme = createTheme(getDesignTokens("light"));
