import "./global.css";
import LoginPage from "./pages/Login.page";
import AppPage from "./pages/App.page";
import PricingPage from "./pages/Pricing.page";
import ProductPage from "./pages/Product.page";
import HomePage from "./pages/Home.page";
import ErrorPage from "./pages/Error.page";
import {
    BrowserRouter,
    createBrowserRouter,
    Route,
    RouterProvider,
    Routes,
} from "react-router";

const AppRoutesV1 = function () {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path="/pricing" element={<PricingPage />} />
                <Route path="/product" element={<ProductPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/app" element={<AppPage />} />
                <Route path= "*"  element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

const AppRoutesV2 = createBrowserRouter([
    { path: "/", element: <HomePage /> },
    { path: "/pricing", element: <PricingPage /> },
    { path: "/product", element: <ProductPage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/app", element: <AppPage /> },
    { path:"*" , element: <ErrorPage /> },
]);

function App() {
    // return <AppRoutesV1 />;
    return <RouterProvider router={AppRoutesV2} />;
}

export default App;
