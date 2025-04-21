
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Search from "./pages/Search";
import MovieDetail from "./pages/MovieDetail";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import MyWatchlists from "./pages/MyWatchlists";
import CreateWatchlist from "./pages/CreateWatchlist";
import WatchlistDetail from "./pages/WatchlistDetail";
import MyAccount from "./pages/MyAccount";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/my-watchlists" element={<MyWatchlists />} />
            <Route path="/create-watchlist" element={<CreateWatchlist />} />
            <Route path="/watchlist/:id" element={<WatchlistDetail />} />
            <Route path="/my-account" element={<MyAccount />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
