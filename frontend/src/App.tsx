import { ThemeProvider } from "./components/ui/darktheme/theme-provider";
import { ModeToggle } from "./components/ui/darktheme/mode-toggle";

function App() {

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex h-screen w-full items-center justify-center">
        <ModeToggle/>
      </div>
    </ThemeProvider>
  )
}

export default App
