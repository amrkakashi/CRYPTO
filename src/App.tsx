import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";
import { useEffect } from "react";
import Lenis from "lenis";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter(routes);

  useEffect(() => {
    const lenis = new Lenis({
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;
