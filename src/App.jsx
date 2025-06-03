import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginAuth from "./pages/LoginAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import Records from "./pages/Records";
import { AddRecord } from "./pages/AddRecord";
import { PdfRecord } from "./pages/PdfRecord";
import QmsRecords from "./pages/QmsRecords";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<LoginAuth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/records" element={<Records />} />
            <Route path="/add-record" element={<AddRecord />} />
            <Route path="/sysuser" element={<QmsRecords />} />
            <Route path="/pdf-view/:id" element={<PdfRecord />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  );
}

export default App;
