import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          // 100: "#d0d1d5",
          100: "#f8f1f1", //Colour from palette
          200: "#f2e3db", //background light colour
          300: "#f5ebeb",
          400: "#e1c0c0",
          500: "#bb7878",
          600: "#a45e5e",
          700: "#894c4c",
          800: "#01181c",
          900: "#012930",
          // 100: "#f2e3db",
          // 200: "#a1a4ab",
          // 300: "#727681",
          // 400: "#1F2A40",
          // 500: "#141b2d",
          // 600: "#101624",
          // 700: "#0c101b",
          // 800: "#080b12",
          // 900: "#040509",
          // 150: "#f2e3db", //greens palette
          // 250: "#41644a",
          // 350: "#263a29",
          // 450: "#e86a33",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#c3fff8",
          200: "#8ffff3",
          300: "#42ffea",
          400: "#00ffe9",
          500: "#00f7ff",
          600: "#00c4dd",
          700: "#007a8d",
          800: "#025464", //Colour from palette
          900: "#012930",
          950: "#004353",

          // 100: "#e1e2fe",
          // 200: "#c3c6fd",
          // 300: "#a4a9fc",
          // 400: "#868dfb",
          // 500: "#6870fa",
          // 600: "#535ac8",
          // 700: "#3e4396",
          // 800: "#2a2d64",
          // 900: "#151632",
        },
        yellowAccent: {
          100: "#f9eccc",
          200: "#f2d795",
          300: "#ecbc5d",
          400: "#e8aa42", //Colour from palette
          500: "#df8621",
          600: "#c5661a",
          700: "#a44819",
          800: "#86391a",
          900: "#6e3019",
          // 100: "#f5f2c1",
          // 200: "#f5f3ab",
          // 300: "#f5f093",
          // 400: "#f5f17a",
          // 500: "#f5f062",
          // 600: "#f5ef49",
          // 700: "#f5f031",
          // 800: "#f5f118",
          // 900: "#f5f100",
        },
        zest: {
          50: "#fef7ec",
          100: "#fae9cb",
          200: "#f5d092",
          300: "#efb35a",
          400: "#ec9933",
          500: "#e57c23", //Colour from palette
          600: "#ca5715",
          700: "#a83c15",
          800: "#882f18",
          900: "#702817",
          950: "#401208",
        },
        black: {
          100: "#ffffff",
          200: "#c8c8c8",
          300: "#a4a4a4",
          400: "#818181",
          500: "#666666",
          600: "#515151",
          700: "#434343",
          800: "#383838",
          900: "#000000",
        },
        whiteOnly: {
          100: "#000000",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#170c0c",
          200: "#331c1c",
          300: "#894c4c",
          400: "#a45e5e",
          500: "#bb7878",
          600: "#e1c0c0",
          700: "#f5ebeb",
          800: "#f2e3db", //background light colour
          900: "#f8f1f1", //Colour from palette

          // 100: "#040509",
          // 200: "#080b12",
          // 300: "#0c101b",
          // 400: "#f2f0f0", // manually changed
          // 500: "#141b2d",
          // 600: "#1F2A40",
          // 700: "#727681",
          // 800: "#a1a4ab",
          // 900: "#d0d1d5",
          // 950: "#f2e3db",
          // 150: "#f2e3db", //greens palette
          // 250: "#41644A",
          // 350: "#263A29",
          // 450: "#E86A33",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          50: "#004353",
          100: "#012930",
          200: "#025464", //Colour from palette
          300: "#007a8d",
          400: "#00c4dd",
          500: "#00f7ff",
          600: "#00ffe9",
          700: "#42ffea",
          800: "#8ffff3",
          900: "#c3fff8",
          // 100: "#151632",
          // 200: "#2a2d64",
          // 300: "#3e4396",
          // 400: "#535ac8",
          // 500: "#6870fa",
          // 600: "#868dfb",
          // 700: "#a4a9fc",
          // 800: "#c3c6fd",
          // 900: "#e1e2fe",
        },
        yellowAccent: {
          100: "#6e3019",
          200: "#86391a",
          300: "#a44819",
          400: "#c5661a",
          500: "#df8621",
          600: "#e8aa42",
          700: "#ecbc5d",
          800: "#f2d795",
          900: "#f9eccc",
          // 100: "#f5f2c1",
          // 200: "#f5f3ab",
          // 300: "#f5f093",
          // 400: "#f5f17a",
          // 500: "#f5f062",
          // 600: "#f5ef49",
          // 700: "#f5f031",
          // 800: "#f5f118",
          // 900: "#f5f100",
        },
        zest: {
          100: "#702817",
          200: "#882f18",
          300: "#a83c15",
          400: "#ca5715",
          500: "#e57c23", //Colour from palette
          600: "#ec9933",
          700: "#efb35a",
          800: "#f5d092",
          900: "#fae9cb",
        },

        black: {
          100: "#000000",
          200: "#383838",
          300: "#434343",
          400: "#515151",
          500: "#666666",
          600: "#818181",
          700: "#a4a4a4",
          800: "#c8c8c8",
          900: "#ffffff",
        },
        whiteOnly: {
          100: "#000000",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              // main: colors.greenAccent[600],
              main: colors.zest[500],
            },
            // },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[800],
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[900],
              // main: colors.grey[500],
            },
            secondary: {
              // main: colors.greenAccent[600],
              main: colors.zest[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#fcfcfc",
            },
          }),
    },
    typography: {
      fontFamily: ["Urbanist:wght@700", "sans-serif"].join(","),
      fontSize: 14,
      h1: {
        fontFamily: ["Urbanist:wght@700", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Urbanist:wght@700", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Urbanist:wght@700", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Urbanist:wght@700", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["UUrbanist:wght@700", "sans-serif"].join(","),
        fontSize: 18,
      },
      h6: {
        fontFamily: ["Urbanist:wght@700t", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode];
};
