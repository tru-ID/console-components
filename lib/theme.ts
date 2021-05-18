import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  config: {
    useSystemColorMode: false,
  },
  fonts: {
    body: "IBM Plex Sans",
    heading: "Bai Jamjuree",
    mono: "Menlo, monospace",
  },
  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "28px",
    "4xl": "36px",
    "5xl": "60px",
    "6xl": "80px",
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "500",
        height: "48px",
        borderRadius: 8,
      },
      sizes: {
        md: {
          paddingX: "40px",
          px: "40px",
        },
      },
      variants: {
        navButton: {
          bg: "blue.500",
          _hover: {
            bg: "blue.600",
            textDecoration: "none",
          },
        },
        navButtonOutline: {
          bg: "transparent",
          borderWidth: 2,
          borderColor: "white",
          _hover: {
            bg: "transparent",
            textDecoration: "none",
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        color: "#0A0A32",
        fontFamily: "Bai Jamjuree",
        fontWeight: "600",
      },
    },
  },
  styles: {
    global: {
      "html, body, p": {
        fontSize: "lg",
        fontFamily: "IBM Plex Sans",
      },
      // 'h1, h2, h3, h4, h5': {
      //   color: '#0A0A32',
      //   fontFamily: 'Bai Jamjuree',
      //   fontWeight: '600',
      // },
    },
  },
  colors: {
    microsoft: {
      50: "#e2efff",
      100: "#b4d0ff",
      200: "#86b1f9",
      300: "#5692f5",
      400: "#2973f1",
      500: "#135ad8",
      600: "#0a46a9",
      700: "#033279",
      800: "#001e4b",
      900: "#000a1e",
    },
    github: {
      50: "#fbf0f2",
      100: "#dcd8d9",
      200: "#bfbfbf",
      300: "#a6a6a6",
      400: "#8c8c8c",
      500: "#333333",
      600: "#282626",
      700: "#150a0d",
      800: "#000000",
      900: "#000000",
    },
    google: {
      50: "#ffeade",
      100: "#ffc8b1",
      200: "#fca482",
      300: "#f98152",
      400: "#f75d22",
      500: "#dd4408",
      600: "#ad3406",
      700: "#7c2503",
      800: "#4c1500",
      900: "#200400",
    },
    blue: {
      100: "#bee3f8",
      200: "#95c0fa",
      300: "#6c9cfc",
      400: "#4279fd",
      500: "#1955ff",
      600: "#1542cc",
      700: "#123099",
      800: "#0e1d65",
      900: "#0a0a32",
    },
    dark: "#171923",
  },
});

export default theme;
