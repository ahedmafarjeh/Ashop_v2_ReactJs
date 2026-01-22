import { createTheme } from "@mui/material/styles"

const setTheme = (mode) => {
    return createTheme({
        palette: {
            mode: mode,
            primary: {
                main: "#1976d2",
            },
            background: {
                default: mode === "light" ? "#e5ecff" : "#2a2f4a",
                paper: mode === "light" ? "#ffffff" : "#1e1e2e", // خلفية الـ Paper
            },

        }
    })
}
export default setTheme;