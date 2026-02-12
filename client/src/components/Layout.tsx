import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import DNavbar from "./DNavbar";

const Layout = () => {
    return (
        <Grid
            templateAreas={`
                "aside nav"
                "aside content"
                `}
                templateColumns={{md:"auto 1fr", lg:"auto 1fr"}}
                templateRows="auto 1fr"
        >
            <GridItem area="nav">
                <DNavbar />
            </GridItem>
            <GridItem area="aside">
                <Sidebar />
            </GridItem>
            <GridItem area="content">
                <Outlet />
            </GridItem>
        </Grid>
    );
};
export default Layout;
