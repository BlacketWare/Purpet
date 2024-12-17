import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import axios, { AxiosError } from "axios";
import ContextWrapper from "@contexts";
import BackgroundWrapper from "@components/Wrapper/Background";
import SidebarWrapper from "@components/Wrapper/Sidebar";
import views from "./views";

const router = createBrowserRouter([
    {
        id: "app",
        element: <ContextWrapper><Outlet /></ContextWrapper>,
        errorElement: <views.Error />,
        children: [
            {
                path: "*",
                element: <BackgroundWrapper>
                    <views.NotFound />
                </BackgroundWrapper>
            },
            {
                path: "/",
                element: <BackgroundWrapper>
                    <views.Home />
                </BackgroundWrapper>
            },
            {
                path: "/terms",
                element: <BackgroundWrapper>
                    <views.Terms />
                </BackgroundWrapper>
            },
            {
                path: "/privacy",
                element: <BackgroundWrapper>
                    <views.Privacy />
                </BackgroundWrapper>
            },
            {
                path: "/login",
                element: <BackgroundWrapper>
                    <views.Auth type="Login" />
                </BackgroundWrapper>
            },
            {
                path: "/register",
                element: <BackgroundWrapper>
                    <views.Auth type="Register" />
                </BackgroundWrapper>
            },
            {
                path: "/stats",
                element: <SidebarWrapper>
                    <views.Stats />
                </SidebarWrapper>
            },
            {
                path: "/leaderboard",
                element: <SidebarWrapper>
                    <views.Leaderboard />
                </SidebarWrapper>
            },
            {
                path: "/chat",
                element: <SidebarWrapper>
                    <views.Chat />
                </SidebarWrapper>
            },
            {
                path: "/market",
                element: <SidebarWrapper>
                    <views.Market />
                </SidebarWrapper>
            },
            {
                path: "/blooks",
                element: <SidebarWrapper>
                    <views.Blooks />
                </SidebarWrapper>
            },
            {
                path: "/auctions",
                element: <SidebarWrapper>
                    <views.Auctions />
                </SidebarWrapper>
            },
            {
                path: "/trading",
                element: <SidebarWrapper>
                    <views.Trading />
                </SidebarWrapper>
            },
            {
                path: "/quests",
                element: <SidebarWrapper>
                    <views.Quests />
                </SidebarWrapper>
            },
            {
                path: "/crafting",
                element: <SidebarWrapper>
                    <views.Crafting />
                </SidebarWrapper>
            },
            {
                path: "/clubs",
                element: <SidebarWrapper>
                    <views.Clubs />
                </SidebarWrapper>
            },
            {
                path: "/store",
                element: <SidebarWrapper>
                    <views.Store />
                </SidebarWrapper>
            },
            {
                path: "/settings",
                element: <SidebarWrapper>
                    <views.Settings />
                </SidebarWrapper>
            }
        ]
    }
]);

export default function App() {
    axios.defaults.baseURL = process.env.API_URL;
    axios.defaults.withCredentials = true;
    axios.interceptors.response.use(
        (response) => response,
        async (error: AxiosError) => {
            const config = error?.config;

            // @ts-expect-error stfu axios idc
            if (error?.response?.status === 401 && !config?.sent && config?.url !== "/auth/refresh") {
                // @ts-expect-error stfu axios idc
                config.sent = true;

                await axios.post("/auth/refresh").catch(() => {
                    document.cookie = "";
                    return Promise.reject(error);
                });
                // @ts-expect-error stfu axios idc

                return axios.request(config);
            }

            document.cookie = "";
            return Promise.reject(error);
        }
    );

    console.log("%cWARNING!", "color: red; font-size: 200%;");
    console.log("The browser console is a developer tool not intended for use by users. DO NOT copy and paste any code in this window. Pasting code into this window is against our Terms of Service, and could result in a scam. https://purpet.xyz/terms");

    return <RouterProvider router={router} />;
}